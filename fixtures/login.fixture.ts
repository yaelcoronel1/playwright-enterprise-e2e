import { test as base } from '../fixtures/pages.fixture';
import { users } from '../test-data/authentication/credentials';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';

type LoginFixtures = {
  loginPage: LoginPage;
  loggedInDashboard: DashboardPage;
};

export const test = base.extend<LoginFixtures>({
  loggedInDashboard: async ({ loginPage }, use) => {
    const dashboardPage = await loginPage.login(users.valid.username, users.valid.password);

    await use(dashboardPage);
  },
});

export { expect } from '@playwright/test';
