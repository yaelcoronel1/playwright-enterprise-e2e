import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { DashboardPage } from '../../pages/dashboard.page';

test.describe('Authentication - Feature', () => {

  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach('page opening', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.validateLoaded();
  })

  test('Login with valid credentials', async ({page}) => {
    await loginPage.login('demo', 'demo123');
    dashboardPage = new DashboardPage(page);
    await dashboardPage.validateLoaded();
  })

  test('Login with invalid credentials', async () => {
    await loginPage.login('wrongUser', 'wrongPass');
    await loginPage.errorIsVisible('Usuario o contraseña incorrectos');
  })

  test('Locked account message', async () => {
    await loginPage.login('locked', 'locked');
    await loginPage.blockMsgVisible('Tu cuenta ha sido bloqueada temporalmente. Contacta con soporte.')
  })
})