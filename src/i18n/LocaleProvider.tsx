import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { resumes } from '../data';
import type { ResumeData } from '../data/types';
import { localeFromPath, localePath, localeStorageKey, type Locale } from './locale';

interface LocaleContextValue {
  locale: Locale;
  localized: boolean;
  setLocale: (locale: Locale) => void;
  data: ResumeData;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  initialLocale,
  localized,
}: {
  children: ReactNode;
  initialLocale: Locale;
  localized: boolean;
}) {
  const [locale, updateLocale] = useState(initialLocale);
  const data = resumes[locale];

  function setLocale(next: Locale) {
    if (localized && next !== locale) {
      const { search, hash } = window.location;
      window.history.pushState(null, '', `${localePath(next)}${search}${hash}`);
    }
    updateLocale(next);
  }

  useEffect(() => {
    if (!localized) return;
    function restoreLocale() {
      const next = localeFromPath(window.location.pathname);
      if (next) updateLocale(next);
    }
    window.addEventListener('popstate', restoreLocale);
    return () => window.removeEventListener('popstate', restoreLocale);
  }, [localized]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = data.meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', data.meta.description);
    try {
      localStorage.setItem(localeStorageKey, locale);
    } catch {
      /* Language still works in memory. */
    }
  }, [locale, data]);

  return (
    <LocaleContext.Provider value={{ locale, localized, setLocale, data }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale requires LocaleProvider');
  return context;
}
