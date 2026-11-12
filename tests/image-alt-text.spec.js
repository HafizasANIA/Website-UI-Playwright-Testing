
const { test, expect } = require('@playwright/test');

test('UI-003: Verify image alt text', async ({ page }) => {

  const response = await page.goto(
    'https://the-internet.herokuapp.com/broken_images'
  );

  expect(response?.status()).toBe(200);

  const images = page.locator('.example img');

  await expect(images.first()).toBeAttached();

  const count = await images.count();
  console.log(`Total Images: ${count}`);

  let withAlt = 0;
  let withoutAlt = 0;

  for (let i = 0; i < count; i++) {

    const image = images.nth(i);
    const src = await image.getAttribute('src');
    const alt = await image.getAttribute('alt');

    if (alt && alt.trim().length > 0) {
      console.log(`ALT PRESENT: ${src} | ${alt}`);
      withAlt++;
    } else {
      console.log(`ALT MISSING/EMPTY: ${src}`);
      withoutAlt++;
    }

  }

  console.log('--- ALT TEXT SUMMARY ---');
  console.log(`Images with non-empty alt: ${withAlt}`);
  console.log(`Images with missing/empty alt: ${withoutAlt}`);

});
