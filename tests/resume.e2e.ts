import { expect, test } from '@playwright/test';
import { resumes } from '../src/data';

test('serves valid manifest and icons in development and production', async ({ page }) => {
  for (const port of [4183, 4173]) {
    await page.goto(`http://127.0.0.1:${port}/cv/`);
    const session = await page.context().newCDPSession(page);
    const manifest = await session.send('Page.getAppManifest');
    expect(new URL(manifest.url).pathname).toBe('/cv/assets/site.webmanifest');
    expect(manifest.errors).toEqual([]);
    const data = JSON.parse(manifest.data!);
    expect(data.name).toBeTruthy();
    const icons = await page
      .locator('link[rel="icon"], link[rel="apple-touch-icon"]')
      .evaluateAll((links) => links.map((link) => (link as HTMLLinkElement).href));
    for (const url of [
      ...icons,
      ...data.icons.map((icon: { src: string }) => new URL(icon.src, manifest.url).href),
    ]) {
      const response = await page.request.get(url);
      expect(response.ok()).toBe(true);
      expect(response.headers()['content-type']).toMatch(/^image\//);
    }
    await session.detach();
  }
});

test('switches all sections in place and remembers the selected language', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('./');
  await page.getByRole('button', { name: 'RU', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Ефремов Дмитрий');
  await expect(page.locator('#skills-heading')).toHaveText(resumes.ru.ui.sections.skills);
  await expect(page).toHaveTitle(resumes.ru.meta.title);
  expect(new URL(page.url()).pathname).toBe('/cv/');
  await page.reload();
  await expect(page.getByRole('button', { name: 'RU', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.getByRole('button', { name: 'EN', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Dmitry Efremov');
  await expect(page.locator('#skills-heading')).toHaveText(resumes.en.ui.sections.skills);
  await expect(page.getByRole('link', { name: resumes.en.profile.email })).toHaveAttribute(
    'href',
    `mailto:${resumes.en.profile.email}`,
  );
  await expect
    .poll(() =>
      page
        .locator('img')
        .evaluateAll((images) =>
          images.every(
            (image) =>
              image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0,
          ),
        ),
    )
    .toBe(true);
  expect(errors).toEqual([]);
});

test('project links work by keyboard, across languages, and on direct visits', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await page.getByRole('button', { name: resumes.en.ui.toggleNavigation }).click();
  await page.getByRole('link', { name: resumes.en.ui.sections.experience, exact: true }).click();

  const link = page
    .locator('#experience')
    .getByRole('link', { name: 'EP2D VR Training Simulator' });
  await link.focus();
  await page.keyboard.press('Enter');

  const heading = page.locator('#ep2d-simulator');
  await expect(page).toHaveURL(/\/cv\/#ep2d-simulator$/);
  await expect(heading).toBeFocused();
  await expect(heading).toBeInViewport();
  const headerHeight = (await page.locator('nav').boundingBox())!.height;
  expect((await heading.boundingBox())!.y).toBeGreaterThanOrEqual(headerHeight);

  await page.getByRole('button', { name: 'RU', exact: true }).click();
  await expect(heading).toHaveText('VR-тренажёр ЭП2Д');
  await expect(heading).toBeInViewport();
  await expect(page.locator('#education-heading')).toHaveText('Образование и языки');

  const directVisit = await page.context().newPage();
  await directVisit.goto(page.url());
  await expect(directVisit.locator('#ep2d-simulator')).toBeInViewport();
  await directVisit.close();

  await page.goBack();
  await expect(page).toHaveURL(/\/cv\/#experience$/);
  await expect(page.locator('#experience')).toBeInViewport();
  await page.goForward();
  await expect(page).toHaveURL(/\/cv\/#ep2d-simulator$/);
  await expect(heading).toBeInViewport();
});

test('mobile menu closes after navigation and has no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  const toggle = page.getByRole('button', { name: 'Toggle navigation' });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect((await toggle.boundingBox())!.x).toBeLessThan(40);
  await expect(page.getByRole('button', { name: 'RU', exact: true })).toBeVisible();
  const language = await page.getByRole('group', { name: 'Language', exact: true }).boundingBox();
  expect(language!.x).toBeGreaterThan(240);
  const header = await page.locator('nav').boundingBox();
  const firstSection = await page.locator('#about').boundingBox();
  expect(firstSection!.y).toBe(header!.height);
  expect(firstSection!.height + header!.height).toBe(844);
  await toggle.click();
  await expect(page.getByTestId('menu-backdrop')).toBeVisible();
  await page.getByTestId('menu-backdrop').click({ position: { x: 200, y: 700 } });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByTestId('menu-backdrop')).toBeHidden();
  await toggle.click();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await page.getByRole('button', { name: 'RU', exact: true }).click();
  await page.getByRole('link', { name: resumes.ru.ui.sections.projects, exact: true }).click();
  await expect(page.getByRole('button', { name: 'Переключить навигацию' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
  await expect(page).toHaveURL(/\/cv\/#projects$/);
  await expect(page.getByTestId('menu-backdrop')).toBeHidden();
  await expect(page.locator('#projects')).toBeFocused();
  expect(
    Math.abs((await page.locator('#projects').boundingBox())!.y - header!.height),
  ).toBeLessThanOrEqual(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});

test('detects Russian and works with blocked storage', async ({ browser }) => {
  const context = await browser.newContext({ locale: 'ru-RU' });
  await context.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('Storage disabled');
      },
    });
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/cv/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  await page.getByRole('button', { name: 'EN', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await context.close();
});

test('language changes preserve section anchors', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const viewport of [
    { width: 1920, height: 1080 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('./');
    await page.evaluate(() => document.fonts.ready);
    for (const id of ['experience', 'skills', 'projects']) {
      await page.goto(`./#${id}`);
      for (const code of ['ru', 'en']) {
        await page.getByRole('button', { name: code.toUpperCase(), exact: true }).click();
        await expect(page).toHaveURL(new RegExp(`#${id}$`));
        await expect(page.locator(`#${id}-heading`)).toBeInViewport();
        const data = resumes[code as 'en' | 'ru'];
        await expect(page.locator('nav a[aria-current="location"]')).toHaveText(
          data.ui.sections[id as keyof typeof data.ui.sections],
        );
      }
    }
  }
});

test('responsive navigation resets the mobile menu and stays usable on short screens', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  await page.getByRole('button', { name: resumes.en.ui.toggleNavigation }).click();
  await expect(page.getByTestId('menu-backdrop')).toBeVisible();
  await page.setViewportSize({ width: 1280, height: 400 });
  await page.getByRole('link', { name: resumes.en.ui.sections.interests, exact: true }).click();
  await page.getByRole('button', { name: 'RU', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole('button', { name: resumes.ru.ui.toggleNavigation })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
  await expect(page.getByTestId('menu-backdrop')).toBeHidden();
});

test('keyboard navigation updates the address and supports browser history', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: resumes.en.ui.skipToContent })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
  const projects = page.getByRole('link', { name: resumes.en.ui.sections.projects, exact: true });
  await projects.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#projects')).toBeFocused();
  await expect(page).toHaveURL(/\/cv\/#projects$/);

  await page.getByRole('link', { name: resumes.en.ui.sections.skills, exact: true }).click();
  await expect(page).toHaveURL(/\/cv\/#skills$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/cv\/#projects$/);
  await expect(page.locator('#projects-heading')).toBeInViewport();
  await page.goForward();
  await expect(page).toHaveURL(/\/cv\/#skills$/);
  await expect(page.locator('#skills-heading')).toBeInViewport();
  await page.reload();
  await expect(page.locator('#skills-heading')).toBeInViewport();
});

test('custom icons load the correct files for different screen densities', async ({
  page,
  browser,
}) => {
  await page.goto('./');
  for (const density of [1, 2, 3]) {
    const context = await browser.newContext({ deviceScaleFactor: density });
    const iconPage = await context.newPage();
    await iconPage.goto(page.url());
    const icons = iconPage.locator('img[src*="assets/icons/"]');
    await expect(icons).toHaveCount(3);
    await icons.evaluateAll((images) =>
      Promise.all(images.map((image) => (image as HTMLImageElement).decode())),
    );
    const files = await icons.evaluateAll((images) =>
      images.map((image) => (image as HTMLImageElement).currentSrc),
    );
    const size = density === 1 ? 24 : density === 2 ? 48 : 64;
    expect(files.every((file) => file.endsWith(`-${size}px.png`))).toBe(true);
    await context.close();
  }
});
