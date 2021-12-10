const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {

  // Go to https://www.demoblaze.com/index.html
  await page.goto('https://www.demoblaze.com/index.html');

  // Click a:has-text("Log in")
  await page.click('a:has-text("Log in")');

  // Click text=Log in × Username: Password: Close Log in >> input[type="text"]
  await page.click('text=Log in × Username: Password: Close Log in >> input[type="text"]');

  // Fill text=Log in × Username: Password: Close Log in >> input[type="text"]
  await page.fill('text=Log in × Username: Password: Close Log in >> input[type="text"]', 'SanchTestUser');

  // Click text=Log in × Username: Password: Close Log in >> input[type="password"]
  await page.click('text=Log in × Username: Password: Close Log in >> input[type="password"]');

  // Fill text=Log in × Username: Password: Close Log in >> input[type="password"]
  await page.fill('text=Log in × Username: Password: Close Log in >> input[type="password"]', '123');

  // Click button:has-text("Log in")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://www.demoblaze.com/index.html' }*/),
    page.click('button:has-text("Log in")')
  ]);

  // Click text=Welcome SanchTestUser
  await page.click('text=Welcome SanchTestUser');
  await expect(page).toHaveURL('https://www.demoblaze.com/index.html#');

  // Click text=Nexus 6
  await page.click('text=Nexus 6');
  await expect(page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=3');

  // Click text=Add to cart
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.click('text=Add to cart');
  await expect(page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=3#');

  // Click text=Cart
  await page.click('text=Cart');
  await expect(page).toHaveURL('https://www.demoblaze.com/cart.html');

  // Click text=Delete
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://www.demoblaze.com/cart.html#' }*/),
    page.click('text=Delete')
  ]);

});