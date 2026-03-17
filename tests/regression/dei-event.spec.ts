import { test, expect } from '@playwright/test';

test('dei event register', async ({ page }) => {
  // Some CI environments get a Cloudflare "Just a moment..." interstitial that never resolves.
  // Detect it and fail fast with useful diagnostics instead of burning the whole test timeout.
  const assertNotBlocked = async () => {
    const title = (await page.title().catch(() => '')).trim();
    const url = page.url();

    const bodyText = await page
      .locator('body')
      .innerText()
      .then((t) => t.slice(0, 4000))
      .catch(() => '');

    const looksBlocked =
      /just a moment/i.test(title) ||
      /checking your browser/i.test(bodyText) ||
      /cloudflare/i.test(bodyText) ||
      /attention required/i.test(title);

    if (looksBlocked) {
      throw new Error(
        [
          'Navigation landed on a bot-protection / interstitial page (likely Cloudflare) and cannot proceed in this environment.',
          `url: ${url}`,
          `title: ${title || '(empty)'}`,
          'hint: try running headed locally, using a different runner/egress IP, or allowlisting the CI runner IPs with the site/CDN.',
        ].join('\n'),
      );
    }
  };

  await page.goto('https://pmiloc.org', { waitUntil: 'domcontentloaded', timeout: 60000 });

  // Wait briefly for the real site to render; otherwise fail fast with context.
  await expect
    .poll(async () => (await page.title().catch(() => '')).trim(), { timeout: 20000 })
    .not.toMatch(/just a moment/i);
  await assertNotBlocked();

  await page.getByRole('link', { name: 'DEI (Culture)' }).click();

  await page.getByRole('link', { name: 'View Event Details' }).click();

  await page.getByRole('link', { name: 'REGISTER NOW' }).first().click();

});