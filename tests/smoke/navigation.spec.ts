import { test, expect } from '@playwright/test';

test('navigate pmiloc website', async ({ page }) => {
  await page.goto('https://pmiloc.org/');
  await page.getByRole('heading', { name: 'Welcome to PMI Lakeshore' }).click();
  await page.getByText('About Us').first().click();
  await page.getByRole('link', { name: 'Board of Directors 2026' }).click();
  await page.getByRole('heading', { name: 'Board of Directors' }).click();
  await page.getByText('About Us').first().click();
  await page.getByRole('link', { name: 'Operations Organization' }).click();
  await page.getByText('Operational Structure & Role').click();
  await page.getByText('About Us').first().click();
  await page.getByRole('link', { name: 'Financial Statement & Audit' }).click();
  await page.getByText('The page you attempted to').click();
  await page.getByRole('cell', { name: 'Members Log In' }).getByRole('paragraph').click();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByText('Welcome! Please log in with').click();
  await page.getByRole('button', { name: ' Back' }).click();
  await page.getByText('Member Care').click();
  await page.getByRole('link', { name: 'Member Benefits' }).click();
  await page.locator('h1').click();
  await page.getByRole('link', { name: 'Perkopolis Benefits' }).click();
  await page.getByText('The page you are trying to').click();
  await page.getByRole('link', { name: 'DEI (Culture)' }).click();
  await page.getByRole('heading', { name: 'Diversity, Equity & Inclusion (Culture): Building Belonging in Project' }).click();
  await page.getByRole('link', { name: 'View Event Details' }).click();
  await page.getByRole('heading', { name: 'Meeting/Event Information' }).click();
  await page.getByRole('paragraph').filter({ hasText: 'REGISTER NOW' }).first().click();
  await page.getByRole('link', { name: 'REGISTER NOW' }).nth(1).click();
  await page.getByTestId('product-summary-name').click();
  await page.goto('https://pmiloc.starchapter.com/meetinginfo.php?id=744&ts=1772732946');
  await page.getByRole('link', { name: 'Future Meetings' }).click();
  await page.locator('div:nth-child(20) > div:nth-child(4) > p:nth-child(2) > a').click();
  await page.getByText('Get Involved').first().click();
  await page.getByRole('link', { name: 'Volunteering with Lakeshore' }).click();
  await page.getByText('WHY VOLUNTEER?').click();
  await page.getByText('Professional Development').click();
  await page.getByRole('link', { name: 'Podcast' }).click();

  const element = page.getByText('Welcome to the PMILOC podcast');
  await expect(element).toBeVisible(); // Assertion waits automatically
  await element.click();

  await page.locator('#left_column_td_8635').getByRole('link', { name: 'Podcast Thumbnail' }).click();

  await expect(element).toBeVisible(); // Assertion waits automatically
  await element.click();

  await page.getByText('Professional Development').click();
  await page.getByRole('link', { name: 'Mentorship Program' }).click();
  await page.getByText('Sponsors', { exact: true }).click();
  await page.getByRole('link', { name: 'Current Sponsors' }).click();
});