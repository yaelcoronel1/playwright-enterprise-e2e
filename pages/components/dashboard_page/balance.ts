import { Page, Locator, expect } from '@playwright/test';
import { balance } from '../../../test-data/dashboard/balance';
import { loan } from '../../../test-data/loan/loan-application';

export class BalanceComponent {
  readonly checkingAccountBalance: Locator;
  readonly defaultAccountBalance: Locator;
  readonly savingsBankBalance: Locator;
  readonly defaultSavingsBalance: Locator;
  readonly creditCardBalance: Locator;
  readonly restoreBalanceButton: Locator;
  readonly restoreBalancedHeading: Locator;
  readonly restoreBalanceConfirm: Locator;
  readonly accBalanceAfterLoan: Locator;

  constructor(page: Page) {
    this.checkingAccountBalance = page.getByText('125.450,75');
    this.defaultAccountBalance = page.getByText('500.000,00');
    this.savingsBankBalance = page.getByText('89.320,50');
    this.defaultSavingsBalance = page.getByText('250.000,00');
    this.creditCardBalance = page.getByText('45.000,00');
    this.restoreBalanceButton = page.getByRole('button', { name: 'Restablecer Saldos' });
    this.restoreBalancedHeading = page.getByRole('heading', { name: 'Restablecer Simulador' });
    this.restoreBalanceConfirm = page.getByRole('button', { name: 'Confirmar' });
    this.accBalanceAfterLoan = page.getByText('225.450,75');
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

  protected async validateBalanceOnly(expectedAccountBalance: string) {
    await expect(this.accBalanceAfterLoan).toHaveText(expectedAccountBalance);
  }

  async validateBalanceAfterLoan() {
    await this.validateBalanceOnly(loan.ammounts.afterLoan);
  }
}
