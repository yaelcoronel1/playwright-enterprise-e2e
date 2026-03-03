import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage{
    readonly page: Page;
    readonly dashboardTitle : Locator;
    readonly dashboardExitBtn: Locator;
    readonly dashboardLogoutHeading: Locator;
    readonly dashboardLogoutConfirm: Locator;

    constructor(page: Page) {
    this.page = page;

    this.dashboardTitle = page.getByRole('heading', { name: 'Panel Principal' });
    this.dashboardExitBtn = page.getByRole('button', { name: 'Salir' });
    this.dashboardLogoutHeading = page.getByRole('heading', { name: 'Cerrar Sesión' });
    this.dashboardLogoutConfirm = page.getByRole('button', { name: 'Confirmar' });
  }

  async validateLoaded() {
    await this.dashboardTitle.waitFor();
    await expect(this.dashboardTitle).toBeVisible();
    await this.dashboardExitBtn.waitFor();
  }

  async logout(){
    await this.dashboardExitBtn.click();
    await this.dashboardLogoutHeading.waitFor();
    await this.dashboardLogoutConfirm.click();
  }
}