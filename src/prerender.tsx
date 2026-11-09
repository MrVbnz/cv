import { renderToString } from 'react-dom/server';
import { App } from './App';
import { resumes } from './data';
import { localeCodes, type Locale } from './i18n/locale';

export { localeCodes };

export function renderPage(locale: Locale) {
  return {
    ...resumes[locale].meta,
    markup: renderToString(<App initialLocale={locale} localized prerendered />),
  };
}
