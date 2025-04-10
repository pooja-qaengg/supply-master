import { test, expect } from '@playwright/test';

//const Baseurl ='https://admin.shopify.com/store/e2e-staging-test';
const Baseurl ='https://accounts.shopify.com/lookup';


test('TC-01 Navigating to E2E Staging Test', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('https://accounts.shopify.com/lookup');
    await page.locator("//input[@name='account[email]']").fill('poojaqaengg@gmail.com');
    await page.getByRole('button', { name: 'Continue with email' }).click();
    const passwordInput = page.getByRole('textbox', { name: 'Password' });
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill('Pooja@2025');
    await page.getByRole('button', { name: 'Log in' }).click();
    const shopifyLogo = page.locator("//div[@class = 'ui-navbar__logo']");
    await expect(shopifyLogo).toBeVisible();
    await shopifyLogo.click();
    await page.locator("//div[@class='account-picker__item-content choose-account-card__content']").click();
    await page.locator('//span[text()="Supply Master Staging"]').click({ force: true });
    const frame = page.frameLocator('iframe[name="app-iframe"]');
    const moreBtn = frame.locator("//span[contains(text(), 'Add Supplier')]");
    await moreBtn.waitFor({ state: 'visible', timeout: 10000 });
    await expect(moreBtn).toBeVisible();
    await moreBtn.click();
    await frame.locator('#selectSupplierType').selectOption('ssactivewear');
    await frame.getByRole('textbox', { name: 'Supplier Name*' }).fill('S&S Canada Test');
    await frame.getByRole('textbox', { name: 'Username*' }).fill('415530');
    await frame.getByRole('textbox', { name: 'API Key*' }).fill('d8ea9d20-d8db-4095-ba86-cdfecb1545ba');
    const countryDropdown = frame.getByLabel('Country');
    await countryDropdown.scrollIntoViewIfNeeded();
    await countryDropdown.selectOption('Canada');
    await frame.locator('//button[@id="testCredentials"]').click();
    await expect(frame.locator('//p[text()="Test connection successful!"]')).toBeVisible();
  });
