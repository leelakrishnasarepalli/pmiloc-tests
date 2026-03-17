import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {

  await page.goto('https://pmiloc.org', { waitUntil: 'networkidle' });

  // wait until Cloudflare challenge disappears
  await page.waitForFunction(() => !document.title.includes("Just a moment"), { timeout: 20000 });

  await expect(page).toHaveTitle(/PMI/i);

  await expect(page.getByRole('link', { name: 'UPCOMING EVENTS' })).toBeVisible();

});