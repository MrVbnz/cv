export const localeCodes = ['en', 'ru'] as const;
export type Locale = (typeof localeCodes)[number];

export const localeStorageKey = 'cv.locale';

export function localePath(locale: Locale) {
  return `${import.meta.env.BASE_URL}${locale}/`;
}

export function localeFromPath(pathname: string) {
  return localeCodes.find((locale) => {
    const path = localePath(locale);
    return pathname === path || pathname === `${path}index.html` || pathname === path.slice(0, -1);
  });
}

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
