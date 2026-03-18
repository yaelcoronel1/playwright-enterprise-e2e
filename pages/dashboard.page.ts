import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { LoginPage } from './login.page';
import { transaction } from '../test-data/dashboard/recent-transaction';
import { balance } from '../test-data/dashboard/current-balance';
import { defaultBalance } from '../test-data/dashboard/default-balance';

export class DashboardPage extends BasePage {
  readonly dashboardTitle: Locator;
  readonly dashboardExitBtn: Locator;
  readonly dashboardLogoutHeading: Locator;
  readonly dashboardLogoutConfirm: Locator;
  readonly checkingAccount: Locator;
  readonly checkingAccountBalance: Locator;
  readonly defaultAccountBalance: Locator;
  readonly savingsBank: Locator;
  readonly savingsBankBalance: Locator;
  readonly defaultSavingsBalance: Locator;
  readonly creditCard: Locator;
  readonly creditCardBalance: Locator;
  readonly restoreBalanceButton: Locator;
  readonly restoreBalancedHeading: Locator;
  readonly restoreBalanceConfirm: Locator;
  readonly latestTransactionsHeading: Locator;
  readonly latestTransaction: Locator;
  readonly latestTransactionDate: Locator;
  readonly latestTransactionAmmount: Locator;

  constructor(page: Page) {
    super(page);

    this.dashboardTitle = page.getByRole('heading', { name: 'Panel Principal' });
    this.dashboardExitBtn = page.getByRole('button', { name: 'Salir' });
    this.dashboardLogoutHeading = page.getByRole('heading', { name: 'Cerrar Sesión' });
    this.dashboardLogoutConfirm = page.getByRole('button', { name: 'Confirmar' });
    this.checkingAccount = page.getByText(
      'Cuenta Corriente **** **** **** 1234 Saldo disponible $',
    );
    this.checkingAccountBalance = page.getByText('125.450,75');
    this.defaultAccountBalance = page.getByText('500.000,00');
    this.savingsBank = page.getByText('Caja de Ahorro **** **** **** 5678 Saldo disponible $');
    this.savingsBankBalance = page.getByText('89.320,50');
    this.defaultSavingsBalance = page.getByText('250.000,00');
    this.creditCard = page.getByText('Caja de Ahorro **** **** **** 5678 Saldo disponible $');
    this.creditCardBalance = page.getByText('45.000,00');
    this.restoreBalanceButton = page.getByRole('button', { name: 'Restablecer Saldos' });
    this.restoreBalancedHeading = page.getByRole('heading', { name: 'Restablecer Simulador' });
    this.restoreBalanceConfirm = page.getByRole('button', { name: 'Confirmar' });
    this.latestTransactionsHeading = page.getByRole('heading', { name: 'Últimos Movimientos' });
    this.latestTransaction = page.getByText('Transferencia recibida').first();
    this.latestTransactionDate = page.getByText('Ayer');
    this.latestTransactionAmmount = page.getByText('+$ 15.000,00');
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

  protected async validateIndividualTransaction(
    transaction: Locator,
    expectedTransaction: string,
    date: Locator,
    expectedDate: string,
    ammount: Locator,
    expectedAmmount: string,
  ) {
    await expect(transaction).toHaveText(expectedTransaction);
    await expect(date).toHaveText(expectedDate);
    await expect(ammount).toHaveText(expectedAmmount);
  }

  async validateMostRecentTransaction() {
    await expect(this.latestTransactionsHeading).toBeVisible();
    await this.validateIndividualTransaction(
      this.latestTransaction,
      transaction.transaction.expectedTransaction,
      this.latestTransactionDate,
      transaction.transaction.expectedDate,
      this.latestTransactionAmmount,
      transaction.transaction.expectedAmmount,
    );
  }

  protected async validateBalance(
    checkingAccountBalance: Locator,
    expectedAccountBalance: string,
    savingsBankBalance: Locator,
    expectedSavBankBalance: string,
    creditCardBalance: Locator,
    expectedCardBalance: string,
  ) {
    await expect(checkingAccountBalance).toHaveText(expectedAccountBalance);
    await expect(savingsBankBalance).toHaveText(expectedSavBankBalance);
    await expect(creditCardBalance).toHaveText(expectedCardBalance);
  }

  async validateCurrentBalance() {
    await this.validateBalance(
      this.checkingAccountBalance,
      balance.current.expectedAccountBalance,
      this.savingsBankBalance,
      balance.current.expectedSavBankBalance,
      this.creditCardBalance,
      balance.current.expectedCardBalance,
    );
  }

  async restoreBalance() {
    await this.restoreBalanceButton.click();
    await expect(this.restoreBalancedHeading).toBeVisible();
    await this.restoreBalanceConfirm.click();
  }

  async validateDefaultBalance() {
    await this.validateBalance(
      this.defaultAccountBalance,
      defaultBalance.default.expectedAccountBalance,
      this.defaultSavingsBalance,
      defaultBalance.default.expectedSavBankBalance,
      this.creditCardBalance,
      defaultBalance.default.expectedCardBalance,
    );
  }
}
