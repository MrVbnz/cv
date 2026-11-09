import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { prerenderLocales } from './scripts/prerender';

export default defineConfig({
  base: '/cv/',
  plugins: [react(), prerenderLocales()],
  server: {
    host: '0.0.0.0',
  },
  preview: {
    host: '0.0.0.0',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          ui: ['@chakra-ui/react', '@emotion/react'],
        },
      },
    },
  },
});
