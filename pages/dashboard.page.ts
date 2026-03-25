import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { LoginPage } from './login.page';
import { transaction } from '../test-data/dashboard/recent-transaction';
import { balance } from '../test-data/dashboard/balance';
import { LoansPage } from './loans.page';
import { loan } from '../test-data/loan/loan-application';
import { TransfersPage } from './transfers.page';

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
  readonly loanSection: Locator;
  readonly transferSection: Locator;
  readonly personalTransfer: Locator;
  readonly accBalanceAfterLoan: Locator;
  readonly loanWithdrawal: Locator;

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
    this.loanSection = page.getByRole('listitem').filter({ hasText: 'Préstamos' });
    this.accBalanceAfterLoan = page.getByText('225.450,75');
    this.loanWithdrawal = page.getByText('Desistimiento de Préstamo (Revocación) Hoy -$ 50.000,00');
    this.transferSection = page.getByRole('listitem').filter({ hasText: 'Transferencias' });
    this.personalTransfer = page.getByText('Transferencia entre cuentas propias Hoy +$');
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
    expectedTransaction: string,
    expectedDate: string,
    expectedAmmount: string,
  ) {
    await expect(this.latestTransaction).toHaveText(expectedTransaction);
    await expect(this.latestTransactionDate).toHaveText(expectedDate);
    await expect(this.latestTransactionAmmount).toHaveText(expectedAmmount);
  }

  async validateMostRecentTransaction() {
    await expect(this.latestTransactionsHeading).toBeVisible();
    await this.validateIndividualTransaction(
      transaction.transaction.expectedTransaction,
      transaction.transaction.expectedDate,
      transaction.transaction.expectedAmmount,
    );
  }

  protected async validateBalance(
    expectedAccountBalance: string,
    expectedSavBankBalance: string,
    expectedCardBalance: string,
  ) {
    await expect(this.checkingAccountBalance).toHaveText(expectedAccountBalance);
    await expect(this.savingsBankBalance).toHaveText(expectedSavBankBalance);
    await expect(this.creditCardBalance).toHaveText(expectedCardBalance);
  }

  protected async validateRestoredBalance(
    expectedAccountBalance: string,
    expectedSavBankBalance: string,
    expectedCardBalance: string,
  ) {
    await expect(this.defaultAccountBalance).toHaveText(expectedAccountBalance);
    await expect(this.defaultSavingsBalance).toHaveText(expectedSavBankBalance);
    await expect(this.creditCardBalance).toHaveText(expectedCardBalance);
  }

  async validateCurrentBalance() {
    await this.validateBalance(
      balance.current.expectedAccountBalance,
      balance.current.expectedSavBankBalance,
      balance.current.expectedCardBalance,
    );
  }

  async restoreBalance() {
    await this.restoreBalanceButton.click();
    await expect(this.restoreBalancedHeading).toBeVisible();
    await this.restoreBalanceConfirm.click();
  }

  async validateDefaultBalance() {
    await this.validateRestoredBalance(
      balance.default.expectedAccountBalance,
      balance.default.expectedSavBankBalance,
      balance.default.expectedCardBalance,
    );
  }

  async goToLoansPage() {
    await this.loanSection.click();
    return new LoansPage(this.page);
  }

  protected async validateBalanceOnly(expectedAccountBalance: string) {
    await expect(this.accBalanceAfterLoan).toHaveText(expectedAccountBalance);
  }

  async validateBalanceAfterLoan() {
    await this.validateBalanceOnly(loan.ammounts.afterLoan);
  }

  async validateLoanWithdrawal() {
    await expect(this.loanWithdrawal).toBeVisible();
    await expect(this.loanWithdrawal).toHaveText(transaction.transaction.loanWithdrawal);
  }

  async goToTransfersPage() {
    await this.transferSection.click();
    return new TransfersPage(this.page);
  }

  async validatePersonalTransfer() {
    await this.personalTransfer.scrollIntoViewIfNeeded();
    await expect(this.personalTransfer).toBeVisible();
  }
}
