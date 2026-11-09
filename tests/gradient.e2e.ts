import { expect, test } from '@playwright/test';

type GradientSnapshot = {
  draws: number;
  checksum: number;
  opaque: boolean;
  error: number;
};
type GradientWindow = Window & { gradientSnapshot?: GradientSnapshot };

test('gradient follows scrolling, respects reduced motion and renders at screen density', async ({
  browser,
}) => {
  for (const density of [1, 2]) {
    const context = await browser.newContext({
      viewport: density === 1 ? { width: 1280, height: 720 } : { width: 390, height: 844 },
      deviceScaleFactor: density,
      reducedMotion: 'no-preference',
    });
    await context.addInitScript(() => {
      const original = WebGLRenderingContext.prototype.drawArrays;
      WebGLRenderingContext.prototype.drawArrays = function (...args) {
        original.apply(this, args);
        // Read actual rendered pixels before the browser presents and clears the buffer.
        const pixels = new Uint8Array(this.drawingBufferHeight * 4);
        this.readPixels(
          this.drawingBufferWidth - 2,
          0,
          1,
          this.drawingBufferHeight,
          this.RGBA,
          this.UNSIGNED_BYTE,
          pixels,
        );
        const state = window as GradientWindow;
        state.gradientSnapshot = {
          draws: (state.gradientSnapshot?.draws ?? 0) + 1,
          checksum: pixels.reduce((sum, value, i) => (sum + value * (i + 1)) % 1000000007, 0),
          opaque: pixels.every((value, i) => i % 4 !== 3 || value === 255),
          error: this.getError(),
        };
      };
    });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('http://127.0.0.1:4173/cv/');
    await page.evaluate(() => document.fonts.ready);
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => (window as GradientWindow).gradientSnapshot?.opaque))
      .toBe(true);
    const dimensions = await canvas.evaluate((element) => {
      const surface = element as HTMLCanvasElement;
      return {
        width: surface.width,
        height: surface.height,
        expectedWidth: Math.round(surface.getBoundingClientRect().width * devicePixelRatio),
        expectedHeight: Math.round(surface.getBoundingClientRect().height * devicePixelRatio),
      };
    });
    expect(dimensions.width).toBe(dimensions.expectedWidth);
    expect(dimensions.height).toBe(dimensions.expectedHeight);
    const initial = await page.evaluate(() => (window as GradientWindow).gradientSnapshot!);
    await page.evaluate(() =>
      window.scrollTo({ top: document.documentElement.scrollHeight / 2, behavior: 'instant' }),
    );
    await expect
      .poll(() => page.evaluate(() => (window as GradientWindow).gradientSnapshot?.checksum))
      .not.toBe(initial.checksum);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect
      .poll(() => page.evaluate(() => (window as GradientWindow).gradientSnapshot?.checksum))
      .toBe(initial.checksum);
    const reduced = await page.evaluate(() => (window as GradientWindow).gradientSnapshot!);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => (window as GradientWindow).gradientSnapshot)).toEqual(reduced);
    expect(reduced.error).toBe(0);
    expect(errors).toEqual([]);
    await context.close();
  }
});

test('page remains usable when WebGL is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = new Proxy(original, {
      apply(target, canvas, args) {
        return args[0] === 'webgl' ? null : Reflect.apply(target, canvas, args);
      },
    });
  });
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await expect(page.locator('canvas')).toBeHidden();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('link', { name: 'Projects', exact: true }).click();
  await expect(page.locator('#projects')).toBeFocused();
  await page.getByRole('button', { name: 'RU', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  expect(errors).toEqual([]);
});
