import { Page, Locator, expect} from '@playwright/test';
import { BasePage } from '../pages/base.page';

export class DocumentationPanel extends BasePage{
    readonly docPanel: Locator;
    readonly testPlanLink: Locator;
    readonly functionalDocLink: Locator;

    constructor(page: Page) {
    super(page);

    this.docPanel = page.getByText('📂 Documentación Plan de');
    this.testPlanLink = page.getByRole('link', { name: 'Plan de Pruebas' });
    this.functionalDocLink = page.getByRole('link', { name: 'Doc. Funcional' });

  }
  
  async validateDocPanelLinks(){
    await expect(this.docPanel).toBeVisible();
    await this.openLinkInNewTab(this.testPlanLink, /docs.google.com/);
    await this.openLinkInNewTab(this.functionalDocLink, /docs.google.com/);
  }
}