import { Page, Locator } from '@playwright/test';

export class DashboardPage{
    readonly page: Page;
    readonly dashboardTitle : Locator;
    readonly dashboardExitBtn: Locator;

    constructor(page: Page) {
    this.page = page;

    this.dashboardTitle = page.getByRole('heading', { name: 'Panel Principal' });
    this.dashboardExitBtn = page.getByRole('button', { name: 'Salir' });
  }

  async validateLoaded() {
    await this.dashboardTitle.waitFor();
    await this.dashboardExitBtn.waitFor();
  }
}