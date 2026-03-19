import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { loan } from '../test-data/loan/loan-application';
import { DashboardPage } from './dashboard.page';

export class LoansPage extends BasePage {
  readonly loansPageHeading: Locator;
  readonly homeSection: Locator;
  readonly loanAmmountField: Locator;
  readonly loanInstallments: Locator;
  readonly loanApplyButton: Locator;
  readonly loanConfirmHeading: Locator;
  readonly loanConfirmButton: Locator;
  readonly newLoanAmmount: Locator;
  readonly newLoanInstallments: Locator;

  constructor(page: Page) {
    super(page);

    this.loansPageHeading = page.getByRole('heading', { name: 'Préstamos', exact: true });
    this.loanAmmountField = page.getByRole('spinbutton', { name: 'Monto a solicitar' });
    this.loanInstallments = page.getByLabel('Cuotas');
    this.loanApplyButton = page.getByRole('button', { name: 'Solicitar Préstamo' });
    this.loanConfirmHeading = page.getByRole('heading', { name: 'Confirmar Préstamo' });
    this.loanConfirmButton = page.getByRole('button', { name: 'Confirmar' });
    this.newLoanAmmount = page.locator('#active-loans-list').getByText('$ 100.000,00');
    this.newLoanInstallments = page.getByText('Cuotas:').nth(1);
    this.homeSection = page.getByRole('listitem').filter({ hasText: 'Inicio' });
  }

  protected async loan(loanAmmount: string, loanInstallments: string) {
    await this.loanAmmountField.fill(loanAmmount);
    await this.loanInstallments.selectOption(loanInstallments);
    await this.loanApplyButton.scrollIntoViewIfNeeded();
    await this.loanApplyButton.click();
    await expect(this.loanConfirmHeading).toBeVisible();
    await this.loanConfirmButton.click();
  }

  protected async loanLimit(loanAmmount: string, loanInstallments: string) {
    await this.loanAmmountField.fill(loanAmmount);
    await this.loanInstallments.selectOption(loanInstallments);
    await this.loanApplyButton.scrollIntoViewIfNeeded();
    await this.loanApplyButton.click();
  }

  async loanApplication() {
    await this.loan(loan.ammounts.newLoan, loan.installments.twelve);
  }

  async loanApplicationLimit() {
    await this.loanLimit(loan.ammounts.limitAmmount, loan.installments.twelve);
  }

  protected async validateLoan(
    loanAmmount: Locator,
    expectedLoanAmmount: string,
    installments: Locator,
    expectedInstallments: string,
  ) {
    await expect(loanAmmount).toBeVisible();
    await expect(loanAmmount).toHaveText(expectedLoanAmmount);
    await expect(installments).toBeVisible();
    await expect(installments).toHaveText(expectedInstallments);
  }

  async validateNewLoan() {
    await this.validateLoan(
      this.newLoanAmmount,
      loan.ammounts.newLoanVisible,
      this.newLoanInstallments,
      loan.installments.visibleInstallments,
    );
    await this.homeSection.click();
    return new DashboardPage(this.page);
  }

  async loanConfirmNotToExist() {
    await expect(this.loanConfirmHeading).toBeHidden();
  }
}
