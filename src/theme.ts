import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

export const resumeColors = {
  canvas: '#1a1919',
  sidebar: '#1b1725',
  accent: '#c38beb',
  ink: '#ded5e2',
  muted: '#b9afc3',
  line: '#39313f',
};

export const system = createSystem(
  defaultConfig,
  defineConfig({
    theme: {
      tokens: {
        colors: {
          canvas: { value: resumeColors.canvas },
          sidebar: { value: resumeColors.sidebar },
          accent: { value: resumeColors.accent },
          ink: { value: resumeColors.ink },
          muted: { value: resumeColors.muted },
          line: { value: resumeColors.line },
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
        '--sidebar-width': '17rem',
        '--navigation-duration': '160ms',
        '--language-duration': '80ms',
        scrollBehavior: 'smooth',
        scrollPaddingTop: 'var(--header-height)',
        _motionReduce: { scrollBehavior: 'auto' },
      },
      body: { bg: 'canvas', color: 'ink' },
      '::selection': { bg: 'accent', color: 'sidebar' },
      ':focus-visible': { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
      '#main-content:focus, #main-content :is(section, h4)[tabindex="-1"]:focus': {
        outline: 'none',
      },
    },
  }),
);
