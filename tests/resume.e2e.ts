import { expect, test } from '@playwright/test';

test('serves valid manifest and icons in development and production', async ({ page }) => {
  for (const port of [4183, 4173]) {
    await page.goto(`http://127.0.0.1:${port}/cv/`);
    const session = await page.context().newCDPSession(page);
    const manifest = await session.send('Page.getAppManifest');
    expect(new URL(manifest.url).pathname).toBe('/cv/assets/site.webmanifest');
    expect(manifest.errors).toEqual([]);
    const data = JSON.parse(manifest.data!);
    expect(data.name).toBe('Efremov Dmitry');
    const icons = await page.locator('link[rel="icon"], link[rel="apple-touch-icon"]').evaluateAll(
      links => links.map(link => (link as HTMLLinkElement).href),
    );
    for (const url of [...icons, ...data.icons.map((icon: { src: string }) => new URL(icon.src, manifest.url).href)]) {
      const response = await page.request.get(url);
      expect(response.ok()).toBe(true);
      expect(response.headers()['content-type']).toMatch(/^image\//);
    }
    await session.detach();
  }
});

test('switches all sections in place and remembers the selected language', async ({ page }) => {
  await page.context().clearCookies();
  await page.goto('./');
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.getByRole('button', { name: 'RU', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Ефремов Дмитрий');
  await expect(page.getByRole('heading', { name: 'Навыки', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Низкоуровневое программирование' })).toBeVisible();
  await expect(page).toHaveTitle('Ефремов Дмитрий — резюме');
  expect(new URL(page.url()).pathname).toBe('/cv/');
  await page.reload();
  await expect(page.getByRole('button', { name: 'RU', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'EN', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Efremov Dmitry');
  await expect(page.getByRole('heading', { name: 'Unity Assets', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Низкоуровневое программирование' })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'd.efremov2001@mail.ru' })).toHaveAttribute('href', 'mailto:d.efremov2001@mail.ru');
  expect(await page.locator('img').evaluateAll(images => images.every(image => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0))).toBe(true);
  expect(errors).toEqual([]);
  await page.screenshot({ path: 'test-results/desktop.png' });
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
  await page.getByRole('link', { name: 'Проекты', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Переключить навигацию' })).toHaveAttribute('aria-expanded', 'false');
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.getByTestId('menu-backdrop')).toBeHidden();
  expect((await page.locator('#projects').boundingBox())!.y).toBe(header!.height);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: 'test-results/mobile.png' });
});

test('detects Russian and works with blocked storage', async ({ browser }) => {
  const context = await browser.newContext({ locale: 'ru-RU' });
  await context.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage disabled'); } });
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/cv/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  await page.getByRole('button', { name: 'EN', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await context.close();
});
