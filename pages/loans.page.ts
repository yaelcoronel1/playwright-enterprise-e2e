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

  async loanApplication() {
    await this.loanAmmountField.fill(loan.ammounts.newLoan);
    await this.loanInstallments.selectOption(loan.installments.twelve);
    await this.loanApplyButton.click();
    await this.loanApplyButton.click();
    await expect(this.loanConfirmHeading).toBeVisible();
    await this.loanConfirmButton.click();
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
}
