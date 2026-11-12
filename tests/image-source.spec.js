
const { test, expect } = require('@playwright/test');

test('UI-005: Verify image source URLs', async ({ page, request }) => {

  const response = await page.goto(
    'https://the-internet.herokuapp.com/broken_images'
  );

  expect(response?.status()).toBe(200);

  const images = page.locator('.example img');

  await expect(images.first()).toBeAttached();

  const count = await images.count();

  console.log(`Total Images: ${count}`);

  let passed = 0;
  let failed = 0;

  for (let i = 0; i < count; i++) {

    const image = images.nth(i);
    const src = await image.getAttribute('src');

    if (!src || !src.trim()) {
      console.log(`FAIL: Image ${i + 1} has no source`);
      failed++;
      continue;
    }

    const imageURL = new URL(src, page.url()).href;

    const imageResponse = await request.get(imageURL, {
      failOnStatusCode: false
    });

    const status = imageResponse.status();
    const contentType = imageResponse.headers()['content-type'] || '';

    const valid = status === 200 && contentType.startsWith('image/');

    if (valid) {
      console.log(`PASS: ${src} | HTTP ${status}`);
      passed++;
    } else {
      console.log(`FAIL: ${src} | HTTP ${status} | ${contentType}`);
      failed++;
    }

  }

  console.log('\n--- IMAGE SOURCE SUMMARY ---');
  console.log(`Total Images: ${count}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);

});
