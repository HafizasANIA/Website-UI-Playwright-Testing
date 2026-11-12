
const { test, expect } = require('@playwright/test');

const devices = [
  { name: 'Desktop', width: 1440, height: 900 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Mobile', width: 375, height: 812 }
];

for (const device of devices) {

  test(`UI-008: SauceDemo Responsive - ${device.name}`, async ({ page }) => {

    await page.setViewportSize({
      width: device.width,
      height: device.height
    });


    const response = await page.goto('https://www.saucedemo.com/');

    expect(response?.ok()).toBe(true);


    const username = page.locator('#user-name');
    const password = page.locator('#password');
    const loginButton = page.locator('#login-button');

    await expect(username).toBeVisible();
    await expect(password).toBeVisible();
    await expect(loginButton).toBeVisible();

  
    const pageWidth = await page.evaluate(() =>
      document.documentElement.scrollWidth
    );

    const viewportWidth = device.width;

    const fitsScreen = pageWidth <= viewportWidth;

  
    console.log(`\nDevice: ${device.name}`);
    console.log(`Viewport: ${device.width}x${device.height}`);
    console.log(`Page Width: ${pageWidth}`);
    console.log(`Horizontal Overflow: ${!fitsScreen}`);

    expect(fitsScreen).toBe(true);


    await page.screenshot({
      path: `test-results/saucedemo-${device.name}.png`,
      fullPage: true
    });

  });

}
