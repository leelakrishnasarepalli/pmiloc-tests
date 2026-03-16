import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('https://pmiloc.org');

  await expect(page).toHaveTitle(/PMI/);

  await expect(page.getByRole('link', { name: 'UPCOMING EVENTS' })).toBeVisible();
});