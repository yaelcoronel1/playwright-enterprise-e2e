import { test } from '../../fixtures/login.fixture';
import { users } from '../../test-data/authentication/credentials';
import { errors } from '../../test-data/authentication/error-messages';

test.describe('Authentication - Feature', () => {
  test.beforeEach('Should open the page', async ({ basePage, loginPage }) => {
    await basePage.goto();
    await basePage.validateLoaded(loginPage.title);
  });

  test('Should login with valid credentials', async ({ basePage, loginPage, dashboardPage }) => {
    await loginPage.login(users.valid.username, users.valid.password);
    await basePage.validateLoaded(dashboardPage.dashboardTitle);
  });

  test('Should not be able to login with invalid credentials', async ({ loginPage }) => {
    await loginPage.login(users.invalid.username, users.invalid.password);
    await loginPage.validateError(errors.error.msg);
  });

  test('Should lock account', async ({ loginPage }) => {
    await loginPage.login(users.locked.username, users.locked.password);
    await loginPage.validateBlock(errors.block.msg);
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
