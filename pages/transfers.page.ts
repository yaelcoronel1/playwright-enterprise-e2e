import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { DashboardPage } from './dashboard.page';
import { transfer } from '../test-data/transfers/transfers';

export class TransfersPage extends BasePage {
  readonly homeSection: Locator;
  readonly transfersPageHeading: Locator;
  readonly transferTypeField: Locator;
  readonly sourceAccountField: Locator;
  readonly destinationAccountField: Locator;
  readonly transferAmmountField: Locator;
  readonly transferButton: Locator;
  readonly transferConfirmationHeading: Locator;
  readonly transferConfirmationButton: Locator;
  readonly limitTransferError: Locator;

  constructor(page: Page) {
    super(page);

    this.homeSection = page.getByRole('listitem').filter({ hasText: 'Inicio' });
    this.transfersPageHeading = page.getByRole('heading', { name: 'Transferencias' });
    this.transferTypeField = page.getByLabel('Tipo de transferencia');
    this.sourceAccountField = page.locator('#source-account');
    this.destinationAccountField = page.locator('#destination-own-account');
    this.transferAmmountField = page.getByRole('spinbutton', { name: 'Monto' });
    this.transferButton = page.getByRole('button', { name: 'Transferir' });
    this.transferConfirmationHeading = page.getByRole('heading', {
      name: 'Confirmar Transferencia',
    });
    this.transferConfirmationButton = page.getByRole('button', { name: 'Confirmar' });
    this.limitTransferError = page.getByText('El monto máximo por');
  }

  protected async transfer(
    type: string,
    sourceAccount: string,
    destinationAccount: string,
    transferAmmount: string,
  ) {
    await this.transferTypeField.selectOption(type);
    await this.sourceAccountField.selectOption(sourceAccount);
    await this.destinationAccountField.selectOption(destinationAccount);
    await this.transferAmmountField.fill(transferAmmount);
    await this.transferButton.scrollIntoViewIfNeeded();
    await this.transferButton.click();
    await expect(this.transferConfirmationHeading).toBeVisible();
    await this.transferConfirmationButton.click();
  }

  protected async limitTransfer(
    type: string,
    sourceAccount: string,
    destinationAccount: string,
    transferAmmount: string,
  ) {
    await this.transferTypeField.selectOption(type);
    await this.sourceAccountField.selectOption(sourceAccount);
    await this.destinationAccountField.selectOption(destinationAccount);
    await this.transferAmmountField.fill(transferAmmount);
    await this.transferButton.scrollIntoViewIfNeeded();
    await this.transferButton.click();
    await expect(this.transferConfirmationHeading).toBeVisible();
    await this.transferConfirmationButton.click();
    await expect(this.limitTransferError).toBeVisible();
  }

  async personalTransfer() {
    await this.transfer(
      transfer.type.personalTransfer,
      transfer.sourceAccount.checkingAccount,
      transfer.destinationAccount.savingsAccount,
      transfer.transferAmmount.personalTransferAmmount,
    );
  }

  async goToMainPage() {
    await this.homeSection.click();
    return new DashboardPage(this.page);
  }

  async transferLimit() {
    await this.limitTransfer(
      transfer.type.personalTransfer,
      transfer.sourceAccount.checkingAccount,
      transfer.destinationAccount.savingsAccount,
      transfer.transferAmmount.limitTransferAmmount,
    );
  }
}
