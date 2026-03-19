import { test } from '../../fixtures/loans.fixture';

test.describe('Loans - Feature', () => {
  test.beforeEach('Should open the page', async ({ basePage, loginPage }) => {
    await basePage.goto();
    await basePage.validateLoaded(loginPage.title);
  });

  test('Should be able to apply for a loan', async ({ basePage, loansPage }) => {
    await basePage.validateLoaded(loansPage.loansPageHeading);
    await loansPage.loanApplication();
    const returnedDashboardPage = await loansPage.validateNewLoan();
    await returnedDashboardPage.validateBalanceAfterLoan();
  });
});
