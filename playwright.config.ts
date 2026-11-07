import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.e2e.ts',
  use: {
    baseURL: 'http://127.0.0.1:4173/cv/',
    channel: process.env.PLAYWRIGHT_CHANNEL,
    trace: 'retain-on-failure',
  },
  webServer: [{
    command: 'yarn preview --host 127.0.0.1 --port 4173 --strictPort',
    url: 'http://127.0.0.1:4173/cv/',
    reuseExistingServer: !process.env.CI,
  }, {
    command: 'yarn dev --host 127.0.0.1 --port 4183 --strictPort',
    url: 'http://127.0.0.1:4183/cv/',
    reuseExistingServer: !process.env.CI,
  }],
});
