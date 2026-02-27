import { test, expect } from '@playwright/test';

test.beforeEach('page opening', async ({ page }) => {
  await page.goto('https://homebanking-demo-tests.netlify.app/');
  const title = page.getByRole('heading', { name: 'HOME BANKING' });
  await expect(title).toBeVisible();
})

test('login', async ({page}) => {
  await page.goto('https://homebanking-demo-tests.netlify.app/');
  const user_input = page.getByRole('textbox', { name: 'Usuario' });
  const pass_input = page.getByRole('textbox', { name: 'Contraseña' });
  const login_button = page.getByRole('button', { name: 'Ingresar' });
  await user_input.fill('demo');
  await pass_input.fill('demo123');
  await login_button.click();
})