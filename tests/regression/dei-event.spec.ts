import { test, expect } from '@playwright/test';

test('dei event register', async ({ page }) => {
    await page.goto('https://pmiloc.org/');
    await page.getByRole('link', { name: 'DEI (Culture)' }).click();
    await page.getByRole('link', { name: 'View Event Details' }).click();
    await page.getByRole('link', { name: 'REGISTER NOW' }).first().click();
  });