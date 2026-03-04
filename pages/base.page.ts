import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async validateLoaded(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  protected async openLinkInNewTab(link: Locator, expectedUrl: RegExp) {
    const [newPage] = await Promise.all([this.page.context().waitForEvent('page'), link.click()]);

    await expect(newPage).toHaveURL(expectedUrl);

    await newPage.close();
  }
}
