import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { LoginPage } from './login.page';

export class DashboardPage extends BasePage {
  readonly dashboardTitle: Locator;
  readonly dashboardExitBtn: Locator;
  readonly dashboardLogoutHeading: Locator;
  readonly dashboardLogoutConfirm: Locator;
  readonly checkingAccount: Locator;
  readonly savingsBank: Locator;
  readonly creditCard: Locator;

  constructor(page: Page) {
    super(page);

    this.dashboardTitle = page.getByRole('heading', { name: 'Panel Principal' });
    this.dashboardExitBtn = page.getByRole('button', { name: 'Salir' });
    this.dashboardLogoutHeading = page.getByRole('heading', { name: 'Cerrar Sesión' });
    this.dashboardLogoutConfirm = page.getByRole('button', { name: 'Confirmar' });
    this.checkingAccount = page.getByText(
      'Cuenta Corriente **** **** **** 1234 Saldo disponible $',
    );
    this.savingsBank = page.getByText('Caja de Ahorro **** **** **** 5678 Saldo disponible $');
    this.creditCard = page.getByText('Caja de Ahorro **** **** **** 5678 Saldo disponible $');
  }

  async logout() {
    await this.dashboardExitBtn.click();
    await expect(this.dashboardLogoutHeading).toBeVisible();
    await this.dashboardLogoutConfirm.click();

    return new LoginPage(this.page);
  }

  async validateMainProducts() {
    await expect(this.checkingAccount).toBeVisible();
    await expect(this.savingsBank).toBeVisible();
    await expect(this.creditCard).toBeVisible();
  }
}
