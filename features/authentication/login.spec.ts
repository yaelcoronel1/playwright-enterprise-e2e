import { test} from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { DashboardPage } from '../../pages/dashboard.page';
import { DocumentationPanel } from '../../pages/documentation.panel.';

test.describe('Authentication - Feature', () => {

  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let docPanel: DocumentationPanel;

  test.beforeEach('Page opening', async ({ page }) => {
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

  test('Locked account', async () => {
    await loginPage.login('locked', 'locked');
    await loginPage.blockMsgVisible('Tu cuenta ha sido bloqueada temporalmente. Contacta con soporte.')
  })

  test('Successful logout', async ({page}) => {
    await loginPage.login('demo', 'demo123');
    dashboardPage = new DashboardPage(page);
    await dashboardPage.validateLoaded();
    await dashboardPage.logout();
  })

  test('Documentation panel links', async ({page}) => {
    let docPanel = new DocumentationPanel(page);
    await docPanel.validateDocPanelLinks();
  })
})