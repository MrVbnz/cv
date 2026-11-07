import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

export const system = createSystem(defaultConfig, defineConfig({
  theme: {
    tokens: {
      colors: {
        canvas: { value: '#1a1919' },
        sidebar: { value: '#1b1725' },
        accent: { value: '#c38beb' },
        ink: { value: '#ded5e2' },
        muted: { value: '#b9afc3' },
        line: { value: '#39313f' },
      },
      fonts: {
        body: { value: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' },
        heading: { value: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' },
      },
    },
  },
  globalCss: {
    html: { scrollBehavior: 'smooth', scrollPaddingTop: { base: '5rem', lg: '2rem' }, _motionReduce: { scrollBehavior: 'auto' } },
    body: { bg: 'canvas', color: 'ink' },
    '::selection': { bg: 'accent', color: 'sidebar' },
    ':focus-visible': { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
  },
}));
