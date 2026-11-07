import type { Locale } from '../data/types';

export const localeStorageKey = 'cv.locale';

export function resolveLocale(saved: string | null, languages: readonly string[]): Locale {
  if (saved === 'en' || saved === 'ru') return saved;
  for (const language of languages) {
    const code = language.toLowerCase().split('-')[0];
    if (code === 'en' || code === 'ru') return code;
  }
  return 'en';
}
