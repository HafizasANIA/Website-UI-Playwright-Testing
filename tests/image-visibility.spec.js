const {test, expect} = require('@playwright/test');

test('UI-02 Verify image Visibility', async({page}) =>{

    await page.goto('https://the-internet.herokuapp.com/broken_images');

    const images = page.locator('.example img');
    const count = await images.count();

    console.log(`Total images: ${count}`);

    for(let i =0; i<count; i++) {

        const image = images.nth(i);

        const src = await image.getAttribute('src');

        const visible = await image.isVisible();

        console.log(`${src}: ${visible} ? 'VISIBLE' : 'NOT VISIBLE'}`
        );
    }
})