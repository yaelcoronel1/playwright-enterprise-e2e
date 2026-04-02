import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { LoginPage } from './login.page';
import { transaction } from '../test-data/dashboard/recent-transaction';
import { LoansPage } from './loans.page';
import { TransfersPage } from './transfers.page';
import { BalanceComponent } from './components/dashboard_page/balance';

export class DashboardPage extends BasePage {
  readonly dashboardTitle: Locator;
  readonly dashboardExitBtn: Locator;
  readonly dashboardLogoutHeading: Locator;
  readonly dashboardLogoutConfirm: Locator;
  readonly checkingAccount: Locator;
  readonly savingsBank: Locator;
  readonly creditCard: Locator;
  readonly latestTransactionsHeading: Locator;
  readonly latestTransaction: Locator;
  readonly latestTransactionDate: Locator;
  readonly latestTransactionAmmount: Locator;
  readonly loanSection: Locator;
  readonly transferSection: Locator;
  readonly personalTransfer: Locator;
  readonly loanWithdrawal: Locator;
  readonly balance: BalanceComponent;

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
    this.latestTransactionsHeading = page.getByRole('heading', { name: 'Últimos Movimientos' });
    this.latestTransaction = page.getByText('Transferencia recibida').first();
    this.latestTransactionDate = page.getByText('Ayer');
    this.latestTransactionAmmount = page.getByText('+$ 15.000,00');
    this.loanSection = page.getByRole('listitem').filter({ hasText: 'Préstamos' });
    this.loanWithdrawal = page.getByText('Desistimiento de Préstamo (Revocación) Hoy -$ 50.000,00');
    this.transferSection = page.getByRole('listitem').filter({ hasText: 'Transferencias' });
    this.personalTransfer = page.getByText('Transferencia entre cuentas propias Hoy +$');
    this.balance = new BalanceComponent(page);
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

  async goToLoansPage() {
    await this.loanSection.click();
    return new LoansPage(this.page);
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

  async validateCurrentBalance() {
    await this.balance.validateCurrentBalance();
  }

  async restoreBalance() {
    await this.balance.restoreBalance();
  }

  async validateDefaultBalance() {
    await this.balance.validateDefaultBalance();
  }

  async validateBalanceAfterLoan() {
    await this.balance.validateBalanceAfterLoan();
  }

  async validateTwoTransfers() {
    await this.balance.validateTwoTransfers();
  }
}
