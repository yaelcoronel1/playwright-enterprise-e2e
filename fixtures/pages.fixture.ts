import { test as base } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { LoginPage } from '../pages/login.page';
import { DocumentationPanel } from '../pages/documentation.panel';
import { DashboardPage } from '../pages/dashboard.page';

type Pages = {
  basePage: BasePage;
  loginPage: LoginPage;
  documentationPanel: DocumentationPanel;
  dashboardPage: DashboardPage;
};

export const test = base.extend<Pages>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  documentationPanel: async ({ page }, use) => {
    await use(new DocumentationPanel(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
});

export { expect } from '@playwright/test';
