import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { DashboardPage } from './dashboard.page';
import { errors } from '../test-data/authentication/error-messages';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly title: Locator;
  readonly invalidLoginMsg: Locator;
  readonly blockMsg: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = page.getByRole('textbox', { name: 'Usuario' });
    this.passwordInput = page.getByRole('textbox', { name: 'Contraseña' });
    this.loginButton = page.getByRole('button', { name: 'Ingresar' });
    this.title = page.getByRole('heading', { name: 'HOME BANKING' });
    this.invalidLoginMsg = page.getByText('Usuario o contraseña');
    this.blockMsg = page.getByText('Tu cuenta ha sido bloqueada');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    const dashboardPage = new DashboardPage(this.page);
    return dashboardPage;
  }

  protected async validateError(expectedMessage: string) {
    await expect(this.invalidLoginMsg).toBeVisible();
    await expect(this.invalidLoginMsg).toContainText(expectedMessage);
  }

  protected async validateBlock(expectedMessage: string) {
    await expect(this.blockMsg).toBeVisible();
    await expect(this.blockMsg).toContainText(expectedMessage);
  }
  async errorMsgIsVisible() {
    await this.validateError(errors.error.msg);
  }

  async blockMsgIsVisible() {
    await this.validateBlock(errors.block.msg);
  }
}
