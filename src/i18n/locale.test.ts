import { describe, expect, it } from 'vitest';
import { resolveLocale } from './locale';

describe('language selection', () => {
  it('prioritizes a saved explicit choice over browser preferences', () => {
    expect(resolveLocale('en', ['ru-RU'])).toBe('en');
    expect(resolveLocale('ru', ['en-US'])).toBe('ru');
  });

  it('uses the first supported browser language', () => {
    expect(resolveLocale(null, ['de-DE', 'ru-RU', 'en-US'])).toBe('ru');
    expect(resolveLocale(null, ['en-GB', 'ru'])).toBe('en');
    expect(resolveLocale(null, ['RU-ru'])).toBe('ru');
  });

  it('ignores invalid saved values and falls back to English', () => {
    expect(resolveLocale('invalid', ['ru'])).toBe('ru');
    expect(resolveLocale(null, ['fr-FR'])).toBe('en');
    expect(resolveLocale(null, [])).toBe('en');
  });
});
