import { test } from '../../fixtures/pages.fixture';
import { users } from '../../test-data/authentication/credentials';

test.describe('Authentication - Feature', () => {
  test.beforeEach('Should open the page', async ({ basePage, loginPage }) => {
    await basePage.goto();
    await basePage.validateLoaded(loginPage.title);
  });

  test('Should login with valid credentials', async ({ basePage, loggedInDashboard }) => {
    await basePage.validateLoaded(loggedInDashboard.dashboardTitle);
  });

  test('Should not be able to login with invalid credentials', async ({ loginPage }) => {
    await loginPage.login(users.invalid.username, users.invalid.password);
    await loginPage.errorMsgIsVisible();
  });

  test('Should lock account', async ({ loginPage }) => {
    await loginPage.login(users.locked.username, users.locked.password);
    await loginPage.blockMsgIsVisible();
  });

  test('Should successfully logout', async ({ basePage, loggedInDashboard }) => {
    await basePage.validateLoaded(loggedInDashboard.dashboardTitle);
    const returnedLoginPage = await loggedInDashboard.logout();
    await basePage.validateLoaded(returnedLoginPage.title);
  });

  test('Should validate documentation panel links', async ({ documentationPanel }) => {
    await documentationPanel.validateDocPanelLinks();
  });
});
