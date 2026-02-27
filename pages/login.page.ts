import { Page, Locator, expect} from '@playwright/test';

export class LoginPage{
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly title: Locator;
    readonly invalidLoginMsg: Locator;
    readonly blockMsg: Locator;

    constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.getByRole('textbox', { name: 'Usuario' });
    this.passwordInput = page.getByRole('textbox', { name: 'Contraseña' });
    this.loginButton = page.getByRole('button', { name: 'Ingresar' });
    this.title = page.getByRole('heading', { name: 'HOME BANKING' });
    this.invalidLoginMsg = page.getByText('Usuario o contraseña');
    this.blockMsg = page.getByText('Tu cuenta ha sido bloqueada');
  }

  async goto() {
    await this.page.goto('/');
  }

  async validateLoaded() {
    await this.title.waitFor();
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async errorIsVisible(expectedMessage: string){
    await expect(this.title).toBeVisible();
    await expect(this.invalidLoginMsg).toBeVisible();
    await expect(this.invalidLoginMsg).toContainText(expectedMessage); 
  }

  async blockMsgVisible(expectedMessage: string){
    await expect(this.title).toBeVisible();
    await expect(this.blockMsg).toBeVisible();
    await expect(this.blockMsg).toContainText(expectedMessage); 
  }

}