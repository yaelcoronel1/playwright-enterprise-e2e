import { test } from '@playwright/test';
import { BasePage } from '../../pages/base.page';
import { LoginPage } from '../../pages/login.page';
import { DocumentationPanel } from '../../pages/documentation.panel';
import { users } from '../../test-data/credentials';

test.describe('Authentication - Feature', () => {
  test.beforeEach('Should open the page', async ({ page }) => {
    const basePage = new BasePage(page);
    const loginPage = await basePage.goto();
    await basePage.validateLoaded(loginPage.title);
  });

  test('Should login with valid credentials', async ({ page }) => {
    const basePage = new BasePage(page);
    const loginPage = new LoginPage(page);
    const dashboardPage = await loginPage.login(users.valid.username, users.valid.password);
    await basePage.validateLoaded(dashboardPage.dashboardTitle);
  });

  test('Should not be able to login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(users.invalid.username, users.invalid.password);
    await loginPage.errorIsVisible('Usuario o contraseña incorrectos');
  });

  test('Should lock account', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(users.locked.username, users.locked.password);
    await loginPage.blockMsgVisible(
      'Tu cuenta ha sido bloqueada temporalmente. Contacta con soporte.',
    );
  });

  test('Should successfully logout', async ({ page }) => {
    const basePage = new BasePage(page);
    const loginPage = new LoginPage(page);
    const dashboardPage = await loginPage.login(users.valid.username, users.valid.password);
    await basePage.validateLoaded(dashboardPage.dashboardTitle);
    const returnedLoginPage = await dashboardPage.logout();
    await basePage.validateLoaded(returnedLoginPage.title);
  });

  test('Should validate documentation panel links', async ({ page }) => {
    const docPanel = new DocumentationPanel(page);
    await docPanel.validateDocPanelLinks();
  });
});
