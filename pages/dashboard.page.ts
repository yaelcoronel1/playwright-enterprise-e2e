import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { LoginPage } from './login.page';

export class DashboardPage extends BasePage {
  readonly dashboardTitle: Locator;
  readonly dashboardExitBtn: Locator;
  readonly dashboardLogoutHeading: Locator;
  readonly dashboardLogoutConfirm: Locator;

  constructor(page: Page) {
    super(page);

    this.dashboardTitle = page.getByRole('heading', { name: 'Panel Principal' });
    this.dashboardExitBtn = page.getByRole('button', { name: 'Salir' });
    this.dashboardLogoutHeading = page.getByRole('heading', { name: 'Cerrar Sesión' });
    this.dashboardLogoutConfirm = page.getByRole('button', { name: 'Confirmar' });
  }

  async logout() {
    await this.dashboardExitBtn.click();
    await expect(this.dashboardLogoutHeading).toBeVisible();
    await this.dashboardLogoutConfirm.click();

    return new LoginPage(this.page);
  }
}
