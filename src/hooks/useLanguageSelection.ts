import { useLayoutEffect, useRef } from 'react';
import type { SectionId } from '../data/types';
import type { Locale } from '../i18n/locale';
import { useLocale } from '../i18n/LocaleProvider';
import { getActiveSection } from '../utils/getActiveSection';
import { scrollToElement } from '../utils/scrollToElement';

// The provider owns language state; this hook owns the switcher's scroll behavior.
export function useLanguageSelection() {
  const { locale, setLocale, data } = useLocale();
  const sectionToAlign = useRef<SectionId | null>(null);

  function selectLocale(nextLocale: Locale) {
    if (nextLocale === locale) return;
    // Capture the section before its translation changes the page layout.
    sectionToAlign.current = getActiveSection();
    setLocale(nextLocale);
  }

  useLayoutEffect(() => {
    if (sectionToAlign.current) scrollToElement(sectionToAlign.current);
    sectionToAlign.current = null;
  }, [locale]);

  return { locale, selectLocale, data };
}
