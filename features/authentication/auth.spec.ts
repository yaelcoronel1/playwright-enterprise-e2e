import { test } from '../../fixtures/login.fixture';

test.describe('Authentication - Feature', () => {
  test.beforeEach('Should open the page', async ({ basePage, loginPage }) => {
    await basePage.goto();
    await basePage.validateLoaded(loginPage.title);
  });

  test('Should login with valid credentials', async ({ basePage, loginPage, dashboardPage }) => {
    await loginPage.validLogin();
    await basePage.validateLoaded(dashboardPage.dashboardTitle);
  });

  test('Should not be able to login with invalid credentials', async ({ loginPage }) => {
    await loginPage.invalidLogin();
    await loginPage.errorIsVisible();
  });

  test('Should lock account', async ({ loginPage }) => {
    await loginPage.lockedLogin();
    await loginPage.blockMessageIsVisible();
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
