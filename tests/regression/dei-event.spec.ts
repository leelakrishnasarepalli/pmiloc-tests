import { test, expect } from '@playwright/test';

test('dei event register', async ({ page }) => {

  await page.goto('https://pmiloc.org', { waitUntil: 'networkidle' });

  await page.waitForFunction(() => !document.title.includes("Just a moment"), { timeout: 20000 });

  await page.locator('text=DEI').first().click();

  await page.locator('text=View Event Details').first().click();

  await page.locator('text=REGISTER NOW').first().click();

});