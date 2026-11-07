import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { resumes } from '../data';
import type { Locale, ResumeData } from '../data/types';
import { localeStorageKey, resolveLocale } from './locale';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  data: ResumeData;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    let saved = null;
    try { saved = localStorage.getItem(localeStorageKey); } catch { /* Storage can be disabled. */ }
    return resolveLocale(saved, navigator.languages);
  });
  const data = resumes[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = data.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', data.meta.description);
    try { localStorage.setItem(localeStorageKey, locale); } catch { /* Language still works in memory. */ }
  }, [locale, data]);

  return <LocaleContext.Provider value={{ locale, setLocale, data }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale requires LocaleProvider');
  return context;
}
