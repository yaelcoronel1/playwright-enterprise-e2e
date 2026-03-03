import { test} from '@playwright/test';
import { BasePage } from '../../pages/base.page';
import { LoginPage } from '../../pages/login.page';
import { DashboardPage } from '../../pages/dashboard.page';
import { DocumentationPanel } from '../../pages/documentation.panel';

test.describe('Authentication - Feature', () => {

  test.beforeEach('Page opening', async ({ page }) => {
    const basePage = new BasePage(page);
    const loginPage = new LoginPage(page);
    await basePage.goto();
    await loginPage.validateLoaded();
  })

  test('Login with valid credentials', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.login('demo', 'demo123');
    await dashboardPage.validateLoaded();
  })

  test('Login with invalid credentials', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('wrongUser', 'wrongPass');
    await loginPage.errorIsVisible('Usuario o contraseña incorrectos');
  })

  test('Locked account', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('locked', 'locked');
    await loginPage.blockMsgVisible('Tu cuenta ha sido bloqueada temporalmente. Contacta con soporte.')
  })

  test('Successful logout', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.login('demo', 'demo123');
    await dashboardPage.validateLoaded();
    await dashboardPage.logout();
  })

  test('Documentation panel links', async ({page}) => {
    const docPanel = new DocumentationPanel(page);
    await docPanel.validateDocPanelLinks();
  })
})