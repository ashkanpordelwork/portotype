import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [['list']],
  timeout: 45000,
  expect: { timeout: 8000 },
  use: {
    baseURL: 'http://localhost:4173/naghshineh-prototype/',
    trace: 'on-first-retry',
    actionTimeout: 12000,
  },
  projects: [
    {
      name: 'mobile',
      use: {
        viewport: { width: 360, height: 800 },
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 2,
      },
    },
    {
      name: 'desktop',
      use: {
        viewport: { width: 1440, height: 900 },
      },
    },
  ],
  // سرور پیش‌نمایش باید دستی اجرا شود: npm run preview
  // (در CI خود workflow قبل از تست build و preview را اجرا می‌کند)
})
