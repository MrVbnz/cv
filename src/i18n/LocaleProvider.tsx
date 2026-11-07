import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { resumes } from '../data';
import type { Locale, ResumeData, SectionId } from '../data/types';
import { getActiveSection } from '../hooks/useActiveSection';
import { localeStorageKey, resolveLocale } from './locale';
import { scrollToElement } from '../utils/scrollToElement';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  data: ResumeData;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const sectionToAlign = useRef<SectionId | null>(null);
  const [locale, updateLocale] = useState<Locale>(() => {
    let saved = null;
    try { saved = localStorage.getItem(localeStorageKey); } catch { /* Storage can be disabled. */ }
    return resolveLocale(saved, navigator.languages);
  });
  const data = resumes[locale];

  function setLocale(nextLocale: Locale) {
    if (nextLocale === locale) return;
    // Capture the active section before translated content changes the layout.
    sectionToAlign.current = getActiveSection();
    updateLocale(nextLocale);
  }

  useLayoutEffect(() => {
    const id = sectionToAlign.current;
    sectionToAlign.current = null;
    if (!id) return;
    scrollToElement(id);
  }, [locale]);

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
