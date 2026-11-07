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
        body: { value: '"Fira Sans", system-ui, sans-serif' },
        heading: { value: '"Fira Sans", system-ui, sans-serif' },
      },
    },
  },
  globalCss: {
    html: {
      '--header-height': { base: '5.5rem', lg: '0px' },
      scrollBehavior: 'smooth', scrollPaddingTop: 'var(--header-height)',
      _motionReduce: { scrollBehavior: 'auto' },
    },
    body: { bg: 'canvas', color: 'ink' },
    '::selection': { bg: 'accent', color: 'sidebar' },
    ':focus-visible': { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
  },
}));
