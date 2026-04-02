# playwright-enterprise-e2e

Scalable end-to-end test automation framework built with **Playwright** and **TypeScript** for a **Home Banking** mock web application.

The project is designed with an enterprise mindset: clear separation of concerns, reusable page objects, fixtures for stateful flows, centralized test data, CI execution, linting, formatting, and browser coverage across Chromium, Firefox, and WebKit.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup from Scratch](#setup-from-scratch)
- [Environment Configuration](#environment-configuration)
- [Running the Tests](#running-the-tests)
- [Available Scripts](#available-scripts)
- [Debugging and Reporting](#debugging-and-reporting)
- [CI Pipeline](#ci-pipeline)
- [Known Limitations](#known-limitations)
- [Troubleshooting](#troubleshooting)

## Overview

This repository contains an E2E automation framework for a banking-style web application. The suite covers the main user journeys of the app, including:

- Authentication
- Dashboard validations
- Transfers
- Loans
- Financial operations and balance assertions

The framework is built to be readable, maintainable, and scalable. It uses:
- **Page Object Model (POM)**
- **Fixtures**
- **Centralized test data**
- **Reusable components**
- **CI-ready configuration**

## Tech Stack

- **Playwright** (`@playwright/test`)
- **TypeScript**
- **Node.js**
- **ESLint**
- **Prettier**
- **Husky**
- **lint-staged**
- **GitHub Actions**

## Architecture

The project follows a layered automation design:

1. **Features** contain the test specs grouped by business area.
2. **Fixtures** prepare the required application state for each feature.
3. **Pages** encapsulate locators and page-level actions/assertions.
4. **Components** encapsulate reusable UI blocks inside a page.
5. **Test data** stores reusable domain data such as credentials, balances, and transfer inputs.

This approach keeps tests readable and avoids duplicate selectors or duplicate flow logic.

## Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── playwright.yml
├── .husky/
├── features/
│   ├── authentication/
│   ├── dashboard/
│   ├── loans/
│   └── transfers/
├── fixtures/
├── pages/
│   ├── components/
│   ├── base.page.ts
│   ├── dashboard.page.ts
│   ├── loans.page.ts
│   ├── login.page.ts
│   └── transfers.page.ts
├── test-data/
│   ├── authentication/
│   ├── dashboard/
│   ├── loan/
│   └── transfers/
├── .gitignore
├── .prettierrc.json
├── eslint.config.cjs
├── package.json
└── playwright.config.ts
```

## Prerequisites

Before running the project locally, install:

- **Node.js 20+**
- **npm**
- A supported browser environment for Playwright

Recommended:
- Git
- VS Code
- Playwright extension for VS Code

## Setup from Scratch

### 1. Clone the repository

```bash
git clone https://github.com/yaelcoronel1/playwright-enterprise-e2e.git
cd playwright-enterprise-e2e
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

If you are on Linux and need system dependencies, run:

```bash
npx playwright install --with-deps
```

### 4. Verify the environment

Run lint and a format check before executing the suite:

```bash
npm run lint
npm run format:check
```

## Environment Configuration

The framework is meant to be configurable through environment variables.

### Base URL

Use a `.env` file in the repository root to define the application URL:

```env
PLAYWRIGHT_BASE_URL=https://homebanking-demo-tests.netlify.app
```

If you are running the project in a different environment, update the value accordingly.

### Recommended files

Create these files at the root of the repository:

```text
.env
.env.example
```

Suggested content for `.env.example`:

```env
PLAYWRIGHT_BASE_URL=https://homebanking-demo-tests.netlify.app
```

Important:
- Do **not** commit `.env`.
- Commit `.env.example` so other contributors know what variables are required.

## Running the Tests

### Run the full suite

```bash
npm test
```

### Run the suite in headed mode

```bash
npm run test:headed
```

### Open the HTML report

```bash
npm run test:report
```

### Run a specific feature folder

You can target any folder under `features/`:

```bash
npx playwright test features/authentication
npx playwright test features/dashboard
npx playwright test features/loans
npx playwright test features/transfers
```

### Run a single test file

```bash
npx playwright test features/authentication/auth.spec.ts
```

### Run a single test by name

```bash
npx playwright test --grep "Should login with valid credentials"
```

## Available Scripts

These are the scripts currently defined in `package.json`:

### `npm test`
Runs the full Playwright suite.

```bash
npm test
```

### `npm run test:headed`
Runs the suite with the browser visible.

```bash
npm run test:headed
```

### `npm run test:report`
Opens the latest HTML report generated by Playwright.

```bash
npm run test:report
```

### `npm run codegen`
Opens Playwright Codegen for locator generation and quick test prototyping.

```bash
npm run codegen
```

### `npm run lint`
Runs ESLint on the repository.

```bash
npm run lint
```

### `npm run lint:fix`
Runs ESLint and fixes supported issues automatically.

```bash
npm run lint:fix
```

### `npm run format`
Formats the repository with Prettier.

```bash
npm run format
```

### `npm run format:check`
Checks formatting without modifying files.

```bash
npm run format:check
```

### `npm run prepare`
Runs Husky setup.

```bash
npm run prepare
```

## Debugging and Reporting

### Playwright UI mode

For interactive debugging and test exploration:

```bash
npx playwright test --ui
```

### Playwright debug mode

To pause execution and debug step by step:

```bash
npx playwright test --debug
```

### Inspect traces

The config is set to generate trace data on the first retry and retain video on failures, which helps diagnose flaky runs in CI and locally.

### HTML report

After the suite finishes, open the report with:

```bash
npm run test:report
```

## CI Pipeline

The repository includes GitHub Actions automation for Playwright execution on pushes and pull requests to `main`.

The pipeline currently:
- checks out the code
- sets up Node.js 20
- caches npm dependencies
- installs dependencies
- installs Playwright browsers
- runs ESLint
- executes Playwright tests
- uploads the Playwright HTML report as an artifact

This makes the suite easy to validate in pull requests and gives visibility into failures.

## Known Limitations

This project uses a **mock banking UI**, so a small number of scenarios may be unstable because of the application under test rather than the automation code itself.

Guideline:
- Keep stable tests in the main suite.
- Move app-flaky scenarios to a quarantined test set or mark them clearly as known limitations.
- Document the reason in the spec or README instead of hiding the issue.

This keeps the framework trustworthy and prevents flaky application behavior from lowering confidence in the automation suite.

## Troubleshooting

### Playwright browsers are missing

Run:

```bash
npx playwright install
```

### Linux dependencies are missing

Run:

```bash
npx playwright install --with-deps
```

### Test fails because the base URL is wrong

Check your `.env` file and confirm `PLAYWRIGHT_BASE_URL` is set correctly.

### Report is empty

Make sure tests were executed before running:

```bash
npm run test:report
```

### Lint or format issues

Run:

```bash
npm run lint:fix
npm run format
```

---
