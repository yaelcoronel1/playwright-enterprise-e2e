import { test as base } from '../fixtures/loans.fixture';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { TransfersPage } from '../pages/transfers.page';

type TransfersFixtures = {
  loginPage: LoginPage;
  loggedInDashboard: DashboardPage;
  transfersPage: TransfersPage;
};

export const test = base.extend<TransfersFixtures>({
  transfersPage: async ({ loggedInDashboard }, use) => {
    const inTransfersPage = await loggedInDashboard.goToTransfersPage();
    await use(inTransfersPage);
  },
});

export { expect } from '@playwright/test';
