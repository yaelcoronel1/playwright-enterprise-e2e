import { test as base } from '../fixtures/login.fixture';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { LoansPage } from '../pages/loans.page';

type LoansFixtures = {
  loginPage: LoginPage;
  loggedInDashboard: DashboardPage;
  loansPage: LoansPage;
};

export const test = base.extend<LoansFixtures>({
  loansPage: async ({ loggedInDashboard }, use) => {
    const inLoansPage = await loggedInDashboard.goToLoansPage();
    await use(inLoansPage);
  },
});

export { expect } from '@playwright/test';
