const {test, expect} = require('@playwright/test');


test('UI-10 Mobile navigation Testing', async({page}) =>{

    //Set Viewport

    await page.setViewportSize({width: 375, height: 812});

    //open website 

    await page.goto('https://www.saucedemo.com');

    //Fill User  name

    await page.locator('#user-name').fill('standard_user');

    //Fill Password

    await page.locator('#password').fill('secret_sauce');

    //Clik Login 

    await page.locator('#login-button').click();

   // Verify Inventory URL

   await expect(page).toHaveURL(/inventory.html/)

   //Open Hamburger menu

   await page.locator('#react-burger-menu-btn').click();
   
   await expect(page.locator('#inventory_sidebar_link')).toBeVisible();

   await page.locator('#react-burger-cross-btn').click();

   await expect(page.locator('#inventory_sidebar_link')).toBeHidden();

})
