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

  test('Should not be able to apply for beyond the max loan ammount', async ({
    basePage,
    loansPage,
  }) => {
    await basePage.validateLoaded(loansPage.loansPageHeading);
    await loansPage.loanApplicationLimit();
    await loansPage.loanConfirmNotToExist();
  });

  test('Should be able to see the loan withdrawal button if the loan is recent', async ({
    basePage,
    loansPage,
  }) => {
    await basePage.validateLoaded(loansPage.loansPageHeading);
    await loansPage.withdrawalButtonHidden();
    await loansPage.loanApplication();
    await loansPage.withdrawalButtonVisible();
  });

  test('Should be able to request a loan withdrawal', async ({ basePage, loansPage }) => {
    await basePage.validateLoaded(loansPage.loansPageHeading);
    await loansPage.loanWithdrawal();
    const returnedDashboardPage = await loansPage.validateLoanWithdrawal();
    await returnedDashboardPage.validateLoanWithdrawal();
  });
});
