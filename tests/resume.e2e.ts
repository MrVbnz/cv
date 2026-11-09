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
  await expect(page).toHaveURL(/\/cv\/en\/$/);
  await page.getByRole('link', { name: 'RU', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Ефремов Дмитрий');
  await expect(page.locator('#skills-heading')).toHaveText(resumes.ru.ui.sections.skills);
  await expect(page).toHaveTitle(resumes.ru.meta.title);
  await expect(page).toHaveURL(/\/cv\/ru\/$/);
  await page.reload();
  await expect(page.getByRole('link', { name: 'RU', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );
  await page.getByRole('link', { name: 'EN', exact: true }).click();
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

test('language-specific pages serve the complete CV without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/cv/en/');

  for (const [code, next, name] of [
    ['en', 'ru', 'Dmitry Efremov'],
    ['ru', 'en', 'Ефремов Дмитрий'],
  ] as const) {
    await expect(page).toHaveURL(new RegExp(`/cv/${code}/$`));
    await expect(page.locator('html')).toHaveAttribute('lang', code);
    await expect(page).toHaveTitle(resumes[code].meta.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      resumes[code].meta.description,
    );
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(name);
    await expect(page.locator('main section')).toHaveCount(6);
    await expect(page.locator('canvas')).toHaveCount(0);
    await page.getByRole('link', { name: next.toUpperCase(), exact: true }).click();
  }
  await expect(page).toHaveURL(/\/cv\/en\/$/);
  await context.close();
});

test('language routes switch in place and save the language from direct links', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('cv.locale'))).toBe('en');
  await page.goto('/cv/ru/#skills');
  await expect(page.locator('#skills-heading')).toHaveText(resumes.ru.ui.sections.skills);
  await expect.poll(() => page.evaluate(() => localStorage.getItem('cv.locale'))).toBe('ru');

  const navigationRequests: string[] = [];
  page.on('request', (request) => {
    if (request.isNavigationRequest()) navigationRequests.push(request.url());
  });
  await page.getByRole('link', { name: 'EN', exact: true }).click();
  await expect(page).toHaveURL(/\/cv\/en\/#skills$/);
  await expect(page.locator('#skills-heading')).toHaveText(resumes.en.ui.sections.skills);
  await expect(page.locator('#skills-heading')).toBeInViewport();
  await page.goBack();
  await expect(page).toHaveURL(/\/cv\/ru\/#skills$/);
  await expect(page.locator('#skills-heading')).toHaveText(resumes.ru.ui.sections.skills);
  await page.goForward();
  await expect(page.locator('#skills-heading')).toHaveText(resumes.en.ui.sections.skills);
  expect(navigationRequests).toEqual([]);

  await page.goto('/cv/ru/');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('cv.locale'))).toBe('ru');
  await page.goto('./');
  await expect(page).toHaveURL(/\/cv\/ru\/$/);
  await expect(page.locator('#skills-heading')).toHaveText(resumes.ru.ui.sections.skills);
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
  await expect(page).toHaveURL(/\/cv\/en\/#ep2d-simulator$/);
  await expect(heading).toBeFocused();
  await expect(heading).toBeInViewport();
  const headerHeight = (await page.locator('nav').boundingBox())!.height;
  expect((await heading.boundingBox())!.y).toBeGreaterThanOrEqual(headerHeight);

  await page.getByRole('link', { name: 'RU', exact: true }).click();
  await expect(page).toHaveURL(/\/cv\/ru\/#ep2d-simulator$/);
  await expect(heading).toHaveText('VR-тренажёр ЭП2Д');
  await expect(heading).toBeInViewport();
  await expect(page.locator('#education-heading')).toHaveText('Образование');

  const directVisit = await page.context().newPage();
  await directVisit.goto(page.url());
  await expect(directVisit.locator('#ep2d-simulator')).toBeInViewport();
  await directVisit.close();

  await page.goBack();
  await expect(page).toHaveURL(/\/cv\/en\/#ep2d-simulator$/);
  await expect(heading).toHaveText('EP2D VR Training Simulator');
  await page.goBack();
  await expect(page).toHaveURL(/\/cv\/en\/#experience$/);
  await expect(page.locator('#experience')).toBeInViewport();
  await page.goForward();
  await expect(page).toHaveURL(/\/cv\/en\/#ep2d-simulator$/);
  await expect(heading).toBeInViewport();
});

test('mobile menu closes after navigation and has no horizontal overflow', async ({ page }) => {
  const viewport = { width: 390, height: 844 };
  await page.setViewportSize(viewport);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  const toggle = page.getByRole('button', { name: 'Toggle navigation' });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect((await toggle.boundingBox())!.x).toBeLessThan(40);
  await expect(page.getByRole('link', { name: 'RU', exact: true })).toBeVisible();
  const language = await page.getByRole('group', { name: 'Language', exact: true }).boundingBox();
  expect(language!.x).toBeGreaterThan(240);
  const header = await page.locator('nav').boundingBox();
  const firstSection = page.locator('#about');
  const availableHeight = viewport.height - header!.height;
  const sectionBox = await firstSection.boundingBox();
  const minHeight = await firstSection.evaluate((section) =>
    Number.parseFloat(getComputedStyle(section).minHeight),
  );
  expect(sectionBox!.y).toBeCloseTo(header!.height, 0);
  expect(minHeight).toBeCloseTo(availableHeight, 0);
  expect(sectionBox!.height).toBeGreaterThanOrEqual(availableHeight - 1);
  await toggle.click();
  await expect(page.getByTestId('menu-backdrop')).toBeVisible();
  await page.getByTestId('menu-backdrop').click({ position: { x: 200, y: 700 } });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByTestId('menu-backdrop')).toBeHidden();
  await toggle.click();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await page.getByRole('link', { name: 'RU', exact: true }).click();
  await page.getByRole('link', { name: resumes.ru.ui.sections.projects, exact: true }).click();
  await expect(page.getByRole('button', { name: 'Переключить навигацию' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
  await expect(page).toHaveURL(/\/cv\/ru\/#projects$/);
  await expect(page.getByTestId('menu-backdrop')).toBeHidden();
  await expect(page.locator('#projects')).toBeFocused();
  expect(
    Math.abs((await page.locator('#projects').boundingBox())!.y - header!.height),
  ).toBeLessThanOrEqual(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});

test('normalizes the base address without another navigation, even with blocked storage', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ baseURL, locale: 'ru-RU', reducedMotion: 'reduce' });
  await context.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('Storage disabled');
      },
    });
  });
  const page = await context.newPage();
  await page.goto('./en/');
  const navigations: string[] = [];
  page.on('request', (request) => {
    if (request.isNavigationRequest()) navigations.push(new URL(request.url()).pathname);
  });
  await page.goto('./?from=example#skills');
  await expect(page).toHaveURL(/\/cv\/ru\/\?from=example#skills$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  await expect(page.locator('#skills-heading')).toBeInViewport();
  expect(navigations).toEqual(['/cv/']);

  await page.goBack();
  await expect(page).toHaveURL(/\/cv\/en\/$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/cv\/ru\/\?from=example#skills$/);
  await page.getByRole('link', { name: 'EN', exact: true }).click();
  await expect(page).toHaveURL(/\/cv\/en\/\?from=example#skills$/);
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
        await page.getByRole('link', { name: code.toUpperCase(), exact: true }).click();
        await expect(page).toHaveURL(new RegExp(`/cv/${code}/#${id}$`));
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
  await page.getByRole('link', { name: 'RU', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole('button', { name: resumes.ru.ui.toggleNavigation })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
  await expect(page.getByTestId('menu-backdrop')).toBeHidden();
});

test('desktop navigation uses proportional panels and respects reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1440, height: 1000 });
  const panelLinks = page.locator('nav a[href^="#"]');

  await page.goto('./');
  const nav = page.getByRole('navigation');
  const highlight = page.getByTestId('sidebar-section-highlight');
  const activePanel = page.locator('nav a[aria-current="location"]');
  const highlightError = () =>
    highlight.evaluate((element) => {
      const active = element.parentElement!.querySelector('a[aria-current="location"]')!;
      const panel = active.getBoundingClientRect();
      const rect = element.getBoundingClientRect();
      const nav = element.closest('nav')!.getBoundingClientRect();
      const radius = Number.parseFloat(getComputedStyle(active).borderTopLeftRadius);
      const gap = rect.left - nav.left;
      return Math.max(
        Math.abs(rect.top - panel.top - radius),
        Math.abs(panel.bottom - rect.bottom - radius),
        Math.abs(panel.left - rect.right - gap),
        Math.abs(nav.right - panel.right - gap),
      );
    });
  const maxShareError = () =>
    panelLinks.evaluateAll((links) => {
      const panelHeights = links.map((link) => link.getBoundingClientRect().height);
      const sectionHeights = links.map(
        (link) =>
          document.querySelector(link.getAttribute('href')!)!.getBoundingClientRect().height,
      );
      const panelTotal = panelHeights.reduce((sum, height) => sum + height, 0);
      const sectionTotal = sectionHeights.reduce((sum, height) => sum + height, 0);
      return Math.max(
        ...panelHeights.map((height, index) =>
          Math.abs(height / panelTotal - sectionHeights[index] / sectionTotal),
        ),
      );
    });

  await expect(panelLinks).toHaveCount(6);
  await expect(nav.getByText('Sections', { exact: true })).toHaveCount(0);
  await expect(nav).toHaveCSS('width', '220px');
  await expect(nav).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  const projectsPanel = nav.getByRole('link', { name: 'Projects', exact: true });
  const titleOffset = await projectsPanel.evaluate((panel) => {
    const title = document.createRange();
    title.selectNodeContents(panel);
    return title.getBoundingClientRect().top - panel.getBoundingClientRect().top;
  });
  expect(titleOffset).toBeGreaterThanOrEqual(0);
  expect(titleOffset).toBeLessThan(24);
  await expect(panelLinks.first()).toHaveCSS('font-weight', '400');
  await expect(highlight).toHaveCSS('width', '2px');
  await expect(highlight).toHaveCSS('transition-duration', '0s');
  const skillsPanel = panelLinks.nth(1);
  const idleColor = await skillsPanel.evaluate((panel) => getComputedStyle(panel).backgroundColor);
  await expect(activePanel).not.toHaveCSS('background-color', idleColor);
  await skillsPanel.hover();
  await expect(skillsPanel).not.toHaveCSS('background-color', idleColor);
  await expect(skillsPanel).toHaveCSS('transition-duration', '0s');
  await expect.poll(highlightError).toBeLessThan(1);
  await expect.poll(maxShareError).toBeLessThan(0.01);
  await page.setViewportSize({ width: 1040, height: 900 });
  await expect.poll(maxShareError).toBeLessThan(0.01);

  await projectsPanel.click();
  await expect(page).toHaveURL(/\/cv\/en\/#projects$/);
  await expect(activePanel).toHaveText('Projects');
  await page.getByRole('link', { name: 'RU', exact: true }).click();
  await expect(activePanel).toHaveText('Проекты');
  await expect.poll(maxShareError).toBeLessThan(0.01);
  await expect.poll(highlightError).toBeLessThan(1);

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(highlight).toHaveCSS('transition-duration', '0.3s');
  await expect(highlight).toHaveCSS(
    'transition-timing-function',
    /^(?:ease-in-out|cubic-bezier\(0\.42, 0, 0\.58, 1\))$/,
  );
  await page.mouse.move(0, 0);
  await highlight.evaluate((element) => {
    element.addEventListener('transitionrun', (event) => {
      if (event instanceof TransitionEvent && event.propertyName === 'transform') {
        element.setAttribute('data-moved', 'true');
      }
    });
  });
  const experiencePanel = panelLinks.nth(2);
  await experiencePanel.evaluate((element) => {
    element.addEventListener('transitionrun', (event) => {
      if (event instanceof TransitionEvent && event.propertyName === 'background-color') {
        element.setAttribute('data-color-transition', 'true');
      }
    });
  });
  await page
    .locator('#experience')
    .evaluate((section) => section.scrollIntoView({ behavior: 'instant' }));
  await expect(activePanel).toHaveText('Опыт');
  await expect(highlight).toHaveAttribute('data-moved', 'true');
  await expect(experiencePanel).toHaveAttribute('data-color-transition', 'true');
  await expect.poll(highlightError).toBeLessThan(1);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1040, height: 300 });
  await expect(page.getByRole('link', { name: 'RU', exact: true })).toBeInViewport();
  await panelLinks.last().click();
  await expect(page).toHaveURL(/#interests$/);
});

test('touch navigation keeps the active panel highlighted without hover colors', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    hasTouch: true,
    isMobile: true,
    locale: 'en-US',
    viewport: { width: 1280, height: 900 },
  });
  try {
    const page = await context.newPage();
    await page.goto('./');
    expect(await page.evaluate(() => matchMedia('(hover: none)').matches)).toBe(true);

    const nav = page.getByRole('navigation');
    const activePanel = nav.locator('a[aria-current="location"]');
    const projects = nav.getByRole('link', { name: resumes.en.ui.sections.projects, exact: true });
    await expect(activePanel).toHaveText(resumes.en.ui.sections.about);
    const activeColor = await activePanel.evaluate(
      (panel) => getComputedStyle(panel).backgroundColor,
    );
    const idleColor = await projects.evaluate((panel) => getComputedStyle(panel).backgroundColor);
    expect(activeColor).not.toBe(idleColor);

    await projects.tap();
    await expect(page).toHaveURL(/#projects$/);
    await expect(projects).toHaveAttribute('aria-current', 'location');
    await expect(projects).toHaveCSS('background-color', activeColor);

    await page
      .locator('#experience')
      .evaluate((section) => section.scrollIntoView({ behavior: 'instant' }));
    await expect(activePanel).toHaveText(resumes.en.ui.sections.experience);
    await expect(activePanel).toHaveCSS('background-color', activeColor);
    await expect(projects).toHaveCSS('background-color', idleColor);
  } finally {
    await context.close();
  }
});

test('keyboard navigation updates the address and supports browser history', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  const projects = page.getByRole('link', { name: resumes.en.ui.sections.projects, exact: true });
  await projects.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#projects')).toBeFocused();
  await expect(page).toHaveURL(/\/cv\/en\/#projects$/);

  await page.getByRole('link', { name: resumes.en.ui.sections.skills, exact: true }).click();
  await expect(page).toHaveURL(/\/cv\/en\/#skills$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/cv\/en\/#projects$/);
  await expect(page.locator('#projects-heading')).toBeInViewport();
  await page.goForward();
  await expect(page).toHaveURL(/\/cv\/en\/#skills$/);
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
