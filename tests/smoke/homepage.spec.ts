import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
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

  await expect(page).toHaveTitle(/PMI/i);

  await expect(page.getByRole('link', { name: 'UPCOMING EVENTS' })).toBeVisible();

});