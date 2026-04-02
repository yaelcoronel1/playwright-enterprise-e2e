import { test } from '../../fixtures/transfers.fixture';

test.describe('Transfers - Feature', () => {
  test.beforeEach('Should open the page', async ({ basePage, loginPage }) => {
    await basePage.goto();
    await basePage.validateLoaded(loginPage.title);
  });

  test('Should be able to make a personal transfer', async ({ basePage, transfersPage }) => {
    await basePage.validateLoaded(transfersPage.transfersPageHeading);
    await transfersPage.personalTransfer();
    const returnedDashboardPage = await transfersPage.goToMainPage();
    await returnedDashboardPage.validatePersonalTransfer();
  });

  test('Should not be able to transfer beyond the limit ammount', async ({
    basePage,
    transfersPage,
  }) => {
    await basePage.validateLoaded(transfersPage.transfersPageHeading);
    await transfersPage.transferLimit();
  });

  test('Should not be able to provide an invalid ABA', async ({ basePage, transfersPage }) => {
    await basePage.validateLoaded(transfersPage.transfersPageHeading);
    await transfersPage.validateInvalidAba();
  });
});
