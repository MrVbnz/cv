import { StrictMode } from 'react';
import { flushSync } from 'react-dom';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import { localeFromPath, localePath, localeStorageKey, resolveLocale } from './i18n/locale';
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
const { pathname, search, hash } = window.location;
const pathLocale = localeFromPath(pathname);
const initialLocale = pathLocale ?? preferredLocale();
const base = import.meta.env.BASE_URL;
const atBase =
  pathname === base || pathname === `${base}index.html` || pathname === base.slice(0, -1);

if (atBase) {
  window.history.replaceState(
    window.history.state,
    '',
    `${localePath(initialLocale)}${search}${hash}`,
  );
}

const prerendered = root.hasChildNodes();
const app = (
  <StrictMode>
    <App
      initialLocale={initialLocale}
      localized={atBase || pathLocale !== undefined}
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
