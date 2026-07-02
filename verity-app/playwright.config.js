import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  snapshotDir: './tests/snapshots',
  reporter: [
    ['list'],                                    // realtime output in terminal
    ['html', { outputFolder: 'playwright-report', open: 'never' }], // full HTML report
    ['json', { outputFile: 'playwright-report/results.json' }],     // machine-readable
  ],
  use: {
    baseURL: 'http://localhost:5174',
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure', // auto-capture page screenshot khi test fail
    video: 'off',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
  // Separate test server on 5174 (dev stays on 5173); fresh file reads, no HMR race condition
  webServer: {
    command: 'vite --port 5174',
    url: 'http://localhost:5174',
    reuseExistingServer: false,
  },
})
