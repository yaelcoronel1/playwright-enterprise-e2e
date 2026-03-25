import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { loan } from '../test-data/loan/loan-application';
import { DashboardPage } from './dashboard.page';

export class LoansPage extends BasePage {
  readonly loansPageHeading: Locator;
  readonly homeSection: Locator;
  readonly loanAccountDropdown: Locator;
  readonly loanAmmountField: Locator;
  readonly loanInstallments: Locator;
  readonly loanApplyButton: Locator;
  readonly loanConfirmHeading: Locator;
  readonly loanConfirmButton: Locator;
  readonly newLoanAmmount: Locator;
  readonly newLoanInstallments: Locator;
  readonly settleLoanButton: Locator;
  readonly settleLoanHeading: Locator;
  readonly ammountToPay: Locator;
  readonly confirmSettlementButton: Locator;
  readonly loanWithdrawalButton: Locator;
  readonly loanWithdrawalHeading: Locator;
  readonly loanWithdrawalAmmount: Locator;
  readonly withdrawalConfirmButton: Locator;

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
    this.settleLoanButton = page.getByRole('button', { name: 'Pagar Total' }).nth(1);
    this.settleLoanHeading = page.getByRole('heading', { name: 'Cancelar Préstamo' });
    this.ammountToPay = page.getByText('$ 165.000,00', { exact: true });
    this.confirmSettlementButton = page.getByRole('button', { name: 'Confirmar' });
    this.loanWithdrawalButton = page.getByRole('button', { name: 'Desistir' });
    this.loanWithdrawalHeading = page.getByRole('heading', { name: 'Desistir del Préstamo' });
    this.loanWithdrawalAmmount = page.locator('#modal-body').getByText('$ 50.000,00');
    this.withdrawalConfirmButton = page.getByRole('button', { name: 'Confirmar' });
    this.loanAccountDropdown = page.locator('#loan-destination-account');
  }

  protected async loan(
    checkingAccountOption: string,
    loanAmmount: string,
    loanInstallments: string,
  ) {
    await this.loanAccountDropdown.selectOption(checkingAccountOption);
    await this.loanAmmountField.fill(loanAmmount);
    await this.loanInstallments.selectOption(loanInstallments);
    await this.loanApplyButton.scrollIntoViewIfNeeded();
    await this.loanApplyButton.click();
    await expect(this.loanConfirmHeading).toBeVisible();
    await this.loanConfirmButton.click();
  }

  protected async loanLimit(
    checkingAccountOption: string,
    loanAmmount: string,
    loanInstallments: string,
  ) {
    await this.loanAccountDropdown.selectOption(checkingAccountOption);
    await this.loanAmmountField.fill(loanAmmount);
    await this.loanInstallments.selectOption(loanInstallments);
    await this.loanApplyButton.scrollIntoViewIfNeeded();
    await this.loanApplyButton.click();
  }

  async loanApplication() {
    await this.loan(loan.accounts.checkingAccount, loan.ammounts.newLoan, loan.installments.twelve);
  }

  async loanApplicationLimit() {
    await this.loanLimit(
      loan.accounts.checkingAccount,
      loan.ammounts.limitAmmount,
      loan.installments.twelve,
    );
  }

  protected async validateLoan(expectedLoanAmmount: string, expectedInstallments: string) {
    await expect(this.newLoanAmmount).toBeVisible();
    await expect(this.newLoanAmmount).toHaveText(expectedLoanAmmount);
    await expect(this.newLoanInstallments).toBeVisible();
    await expect(this.newLoanInstallments).toHaveText(expectedInstallments);
  }

  protected async validateLoanToBeHidden() {
    await expect(this.newLoanAmmount).toBeHidden();
    await expect(this.newLoanInstallments).toBeHidden();
  }

  async validateNewLoan() {
    await this.validateLoan(loan.ammounts.newLoanVisible, loan.installments.visibleInstallments);
    await this.homeSection.click();
    return new DashboardPage(this.page);
  }

  async loanConfirmNotToExist() {
    await expect(this.loanConfirmHeading).toBeHidden();
  }

  protected async loanSettlement(ammountToPay: string) {
    await this.validateLoan(loan.ammounts.newLoanVisible, loan.installments.visibleInstallments);
    await this.settleLoanButton.click();
    await expect(this.settleLoanHeading).toBeVisible();
    await expect(this.ammountToPay).toHaveText(ammountToPay);
    await this.confirmSettlementButton.click();
    await this.validateLoanToBeHidden();
  }

  async loanSettlementPayment() {
    await this.loanSettlement(loan.ammounts.ammountToPay);
  }

  async withdrawalButtonHidden() {
    await expect(this.loanWithdrawalButton).toBeHidden();
  }

  async withdrawalButtonVisible() {
    await expect(this.loanWithdrawalButton).toBeVisible();
  }

  async loanWithdrawal() {
    await this.loan(
      loan.accounts.checkingAccount,
      loan.ammounts.withdrawalLoan,
      loan.installments.twelve,
    );
    await this.withdrawalButtonVisible();
    await this.loanWithdrawalButton.click();
    await expect(this.loanWithdrawalHeading).toBeVisible();
    await expect(this.loanWithdrawalAmmount).toHaveText(loan.ammounts.withdrawalLoanVisible);
    await this.withdrawalConfirmButton.click();
    await this.withdrawalButtonHidden();
  }

  async validateLoanWithdrawal() {
    await this.homeSection.click();
    return new DashboardPage(this.page);
  }
}
