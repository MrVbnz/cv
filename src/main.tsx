import { StrictMode } from 'react';
import { flushSync } from 'react-dom';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import { localeFromPath, localeStorageKey, resolveLocale } from './i18n/locale';
import './print.css';

function preferredLocale() {
  let saved = null;
  try {
    saved = localStorage.getItem(localeStorageKey);
  } catch {
    /* Storage can be disabled. */
  }
  return resolveLocale(saved, navigator.languages);
}

const root = document.getElementById('root')!;
const pathLocale = localeFromPath(window.location.pathname);
const prerendered = root.hasChildNodes();
const app = (
  <StrictMode>
    <App
      initialLocale={pathLocale ?? preferredLocale()}
      localized={pathLocale !== undefined}
      prerendered={prerendered}
    />
  </StrictMode>
);

if (prerendered) {
  hydrateRoot(root, app);
} else {
  // Mount the fragment targets before the browser resolves the initial anchor.
  flushSync(() => createRoot(root).render(app));
}
