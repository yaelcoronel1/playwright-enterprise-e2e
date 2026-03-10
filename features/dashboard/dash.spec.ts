import { test } from '../../fixtures/pages.fixture';

test.describe('Dashboard - Feature', () => {
  test.beforeEach('Should open the page', async ({ basePage, loginPage }) => {
    await basePage.goto();
    await basePage.validateLoaded(loginPage.title);
  });

  test('Should display the three main products', async ({ basePage, loggedInDashboard }) => {
    await basePage.validateLoaded(loggedInDashboard.dashboardTitle);
    await loggedInDashboard.validateMainProducts();
  });

  test('Should validate the most recent transaction', async ({ basePage, loggedInDashboard }) => {
    await basePage.validateLoaded(loggedInDashboard.dashboardTitle);
    await loggedInDashboard.validateMostRecentTransaction();
  });
});
