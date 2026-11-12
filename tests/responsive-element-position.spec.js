
const { test, expect } = require('@playwright/test');

const devices = [
  { name: 'Desktop', width: 1440, height: 900 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Mobile', width: 375, height: 812 }
];

for (const device of devices) {

  test(`UI-009: Element Position - ${device.name}`, async ({ page }) => {

    await page.setViewportSize({
      width: device.width,
      height: device.height
    });

    await page.goto('https://www.saucedemo.com/');

    const elements = [
      { name: 'Username', locator: page.locator('#user-name') },
      { name: 'Password', locator: page.locator('#password') },
      { name: 'Login Button', locator: page.locator('#login-button') }
    ];

    let passed = 0;

    for (const element of elements) {

      await expect(element.locator).toBeVisible();

      const box = await element.locator.boundingBox();

      expect(box).not.toBeNull();

      const fitsHorizontally =
        box.x >= 0 &&
        box.x + box.width <= device.width;

      const fitsVertically =
        box.y >= 0 &&
        box.y + box.height <= device.height;

      console.log(`\nDevice: ${device.name}`);
      console.log(`Element: ${element.name}`);
      console.log(`X: ${box.x}, Y: ${box.y}`);
      console.log(`Width: ${box.width}`);
      console.log(`Height: ${box.height}`);
      console.log(`Fits Screen: ${fitsHorizontally && fitsVertically}`);

      if (fitsHorizontally && fitsVertically) {
        passed++;
      }
    }

    await page.screenshot({
      path: `test-results/position-${device.name}.png`,
      fullPage: true
    });

    console.log(`\nPassed Elements: ${passed}/${elements.length}`);

    expect(passed).toBe(elements.length);

  });

}
