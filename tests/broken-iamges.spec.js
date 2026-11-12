
const { test, expect } = require('@playwright/test');

test('UI-001: Detect broken images', async ({ page }) => {

  await page.goto( //open website
    'https://the-internet.herokuapp.com/broken_images'
  );

  const images = page.locator('.example img'); //find images 
  const count = await images.count(); //count images

  console.log(`Total images: ${count}`);

  expect(count).toBe(3); 

  //counters
  let passed = 0;
  let failed = 0;

  for (let i = 0; i < count; i++) {

    const image = images.nth(i);
    const src = await image.getAttribute('src');

    const loaded = await image.evaluate(img =>
      img.complete && img.naturalWidth > 0
    );

    if (loaded) {
      console.log(`PASS: ${src}`);
      passed++;
    } else {
      console.log(`FAIL: ${src} - Broken image detected`);
      failed++;
    }
  }

  console.log('\n----- UI TEST SUMMARY -----');
  console.log(`Total Images: ${count}`);
  console.log(`Passed: ${passed}`);
  console.log(`Broken Images: ${failed}`);

});
