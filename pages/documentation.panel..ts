import { Page, Locator, expect} from '@playwright/test';

export class DocumentationPanel{
    readonly page: Page;
    readonly docPanel: Locator;
    readonly testPlanLink: Locator;
    readonly functionalDocLink: Locator;

    constructor(page: Page) {
    this.page = page;

    this.docPanel = page.getByText('📂 Documentación Plan de');
    this.testPlanLink = page.getByRole('link', { name: 'Plan de Pruebas' });
    this.functionalDocLink = page.getByRole('link', { name: 'Doc. Funcional' });

  }

  private async openLinkInNewTab(link: Locator, expectedUrl: RegExp) {
  const [newPage] = await Promise.all([
    this.page.context().waitForEvent('page'),
    link.click()
  ]);

  await expect(newPage).toHaveURL(expectedUrl);

  await newPage.close();
}
  
  async validateDocPanelLinks(){
    await expect(this.docPanel).toBeVisible();

  await this.openLinkInNewTab(
    this.testPlanLink,
    /docs.google.com/
  );

  await this.openLinkInNewTab(
    this.functionalDocLink,
    /docs.google.com/
  );
  }
}