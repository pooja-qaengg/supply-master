import { test, expect } from '@playwright/test';

const Baseurl ='https://accounts.shopify.com/lookup';

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }


test('TC-01 Navigating to E2E Staging Test', async ({ page }) => {   

    // --------------------------- Login Page  --------------------------- //

    await page.goto('https://accounts.shopify.com/lookup');
    await page.locator("//input[@name='account[email]']").fill('enter your email');
    await page.getByRole('button', { name: 'Continue with email' }).click();
    const passwordInput = page.getByRole('textbox', { name: 'Password' });
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill('enter your password');
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

    // --------------------------- Conection Settings  --------------------------- //

    const randomNumber = getRandomNumber(1, 100);
    await frame.getByRole('textbox', { name: 'Supplier Name*' }).fill(`S&S Canada Test-${randomNumber}`);
    await frame.getByRole('textbox', { name: 'Username*' }).fill('415530');
    await frame.getByRole('textbox', { name: 'API Key*' }).fill('d8ea9d20-d8db-4095-ba86-cdfecb1545ba');
    const countryDropdown = frame.getByLabel('Country');
    await countryDropdown.scrollIntoViewIfNeeded();
    await countryDropdown.selectOption('Canada');
    await frame.locator('//button[@id="testCredentials"]').click();
    await expect(frame.locator('//p[text()="Test connection successful!"]')).toBeVisible();

    // --------------------------- Inventory Settings  --------------------------- //

    await frame.locator('//button[@id="inventory-settings"]').click();
    await frame.locator('//div[@class="Polaris-Select"]//select[@id="PolarisSelect1"]').selectOption('Toronto');
    await frame.locator('//div[@class="Polaris-Select"]//select[@id="PolarisSelect2"]').selectOption('Calgary');

    // --------------------------- Product Settings  --------------------------- //

    await frame.locator('//button[@id="product-settings"]').click();
    await frame.locator("//div[@class='Polaris-Stack__Item']//span[contains(text(),'Add Field')]").dblclick({force:true});
    page.keyboard.press("PageDown")
    await frame.locator('//div[@class="Polaris-Select"]//select[@id="PolarisSelect21"]').selectOption('Specs');
    await frame.locator('//div[@class="Polaris-Select"]//select[@id="PolarisSelect22"]').selectOption('Metafield');
    const metafieldInput8 = frame.locator('//*[@id="metafieldKey-8"]');
    await metafieldInput8.fill('custom.specs');
    await frame.locator('//div[@class="Polaris-Select"]//select[@id="PolarisSelect23"]').selectOption('Variant Color Swatch Image');
    await frame.locator('//div[@class="Polaris-Select"]//select[@id="PolarisSelect24"]').selectOption('Variant Metafields');
    await frame.locator('//div[@class="Polaris-Connected"]//input[@id="metafieldKey-9"]').fill('custom.swatchImage');

    // --------------------------- Save Record  --------------------------- //
    await frame.locator("(//span[contains(text(),'Save Supplier')])[2]").click();
    await page.reload();

    // --------------------------- Validting the newly created Supplier  --------------------------- //

    await expect(frame.locator(`//div[@class="Polaris-Card__Header"]//h2[text()='S&S Canada Test-${randomNumber}']`)).toBeVisible();
    
  });
