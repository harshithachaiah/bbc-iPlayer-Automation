# BBC iPlayer Test Automation

Playwright-based UI test automation framework for testing BBC iPlayer functionality across different environments.

The framework is built using **Playwright Test**, with a focus on maintainability, reusable Page Objects, environment-based configuration, and authenticated test execution.

## Tech Stack

* **Playwright** – Browser automation and end-to-end testing
* **JavaScript** – Test implementation
* **Node.js** – Runtime environment
* **Cross-env** – Cross-platform environment variable support
* **Page Object Model (POM)** – Reusable page interactions and locators

## Project Structure

```text
bbc-iplayer-test-automation/
│
├── auth/
│   └── test-iplayer-state.json
│
├── config/
│   └── environment.js
│
├── pages/
│   └── AccountSelectionPage.js
│
├── tests/
│   ├── account-selection.spec.js
│   └── auth.setup.js
│
├── playwright.config.js
├── package.json
├── package-lock.json
└── README.md
```

> **Note:** Authentication state files should not be committed to Git as they may contain authenticated browser session information.

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Git

Check your installed versions:

```bash
node --version
npm --version
```

## Installation

Clone the repository:

```bash
git clone <https://github.com/harshithachaiah/bbc-iPlayer-Automation.git>
```

Navigate into the project:

```bash
cd bbc-iplayer-test-automation
```

Install dependencies:

```bash
npm install
```

Install the Playwright browser:

```bash
npx playwright install chromium
```

## Environment Configuration

The framework supports two environments:

* **Test**
* **Live**

The environment is controlled using the `TEST_ENV` environment variable.

### Test Environment

```text
TEST_ENV=test
```

### Live Environment

```text
TEST_ENV=live
```

The environment configuration determines which BBC iPlayer environment the tests execute against.

## Authentication

Some BBC iPlayer tests require an authenticated session.

Authentication is handled separately using the authentication setup script. This allows the authenticated browser state to be reused by subsequent tests.

### Authenticate against Test

```bash
npm run auth:test
```

### Authenticate against Live

```bash
npm run auth:live
```

The authentication process may require manual authentication through the BBC account flow.

Once authentication is completed, the browser storage state is saved and can be reused by the test suite.

## Running Tests

### Default Test Run

```bash
npm test
```

### Test Environment

```bash
npm run test:test
```

### Live Environment

```bash
npm run test:live
```

## Running Tests in Headed Mode

Headed mode opens the Chromium browser so the test execution can be observed.

### Test Environment

```bash
npm run test:test:headed
```

### Live Environment

```bash
npm run test:live:headed
```

## Playwright UI Mode

Playwright UI Mode provides an interactive interface for running and debugging tests.

### Test Environment

```bash
npm run test:test:ui
```

### Live Environment

```bash
npm run test:live:ui
```

## Test Reports

After a test run, Playwright generates a test report.

To open the report:

```bash
npm run report
```

Alternatively:

```bash
npx playwright show-report
```

## Page Object Model

The framework uses the **Page Object Model** to keep test specifications focused on test behaviour rather than implementation details.

For example:

```javascript
class AccountSelectionPage {

    constructor(page) {
        this.page = page;

        this.adultAccount = page.getByTestId("HasH");
        this.kidsAccount = page.getByTestId("Hash");
    }

    async selectAdultAccount() {
        await this.adultAccount.click();
    }

    async selectKidsAccount() {
        await this.kidsAccount.click();
    }
}

module.exports = AccountSelectionPage;
```

This approach allows locators and page interactions to be maintained in one place and reused across multiple tests.

## Example Test

A test can use the Page Object without needing to know how the individual page interactions are implemented:

```javascript
const { test } = require("@playwright/test");
const AccountSelectionPage = require("../pages/AccountSelectionPage");

test("User can select an adult account", async ({ page }) => {

    const accountSelectionPage = new AccountSelectionPage(page);

    await accountSelectionPage.navigate();
    await accountSelectionPage.selectAdultAccount();

});
```

## Browser

The framework is currently configured to run tests using **Chromium**.

Chromium is used as the primary browser for the current BBC iPlayer automation scope.

## NPM Scripts

| Command                    | Description                                         |
| -------------------------- | --------------------------------------------------- |
| `npm test`                 | Run Playwright tests                                |
| `npm run test:test`        | Run tests against the Test environment              |
| `npm run test:live`        | Run tests against the Live environment              |
| `npm run test:test:headed` | Run Test environment tests in headed mode           |
| `npm run test:live:headed` | Run Live environment tests in headed mode           |
| `npm run test:test:ui`     | Run Test environment tests using Playwright UI Mode |
| `npm run test:live:ui`     | Run Live environment tests using Playwright UI Mode |
| `npm run auth:test`        | Create authentication state for Test                |
| `npm run auth:live`        | Create authentication state for Live                |
| `npm run report`           | Open the Playwright HTML report                     |

## Test Design Principles

The framework follows several principles:

* **Page Object Model** for reusable page interactions
* **Environment-based execution** for Test and Live environments
* **Reusable authentication state** to avoid repeating authentication
* **Meaningful test descriptions** focused on user behaviour
* **Stable locators**, preferably using accessible roles or dedicated test IDs
* **Assertions within tests/Page Objects** to verify expected application behaviour
* **Chromium-focused execution** for the current scope
* **Playwright HTML reporting** for test results

## Authentication & Security

Authentication state files contain session information and should **never be committed to source control**.

Recommended `.gitignore` entries:

```gitignore
node_modules/
playwright-report/
test-results/
blob-report/
auth/*.json
.env
.DS_Store
```

## Future Improvements

Potential areas for extending the framework include:

* CI/CD integration
* Additional BBC iPlayer user journeys
* Improved test data management
* API-level setup where appropriate
* Screenshot and trace collection for failed tests
* Test tagging and selective execution
* Parallel test execution
* Improved reporting
* Environment-specific configuration management

## Author

**Harshith Achaiah**

Personal test automation project focused on developing practical experience with Playwright, JavaScript, end-to-end testing, and maintainable automation framework design.
