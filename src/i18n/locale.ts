export const localeCodes = ['en', 'ru'] as const;
export type Locale = (typeof localeCodes)[number];

export const localeStorageKey = 'cv.locale';

export function resolveLocale(saved: string | null, languages: readonly string[]): Locale {
  const savedLocale = localeCodes.find((locale) => locale === saved);
  if (savedLocale) return savedLocale;
  for (const language of languages) {
    const code = language.toLowerCase().split('-')[0];
    const locale = localeCodes.find((locale) => locale === code);
    if (locale) return locale;
  }
  return 'en';
}
