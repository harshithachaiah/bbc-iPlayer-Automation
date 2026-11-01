
const { test } = require("@playwright/test");

const AccountSelectionPage = require(
    "../pages/account-selection.page"
);

test.describe("BBC iPlayer Account Selection", () => {

    const accounts = [
        {
            name: "Adult",
            selectMethod: "selectAdultAccount"
        },
        {
            name: "Kids",
            selectMethod: "selectKidsAccount"
        }
    ];

    for (const account of accounts) {
        test(`User can select ${account.name} account`, async ({ page }) => {

            const accountSelectionPage =
                new AccountSelectionPage(page);

            await accountSelectionPage.navigate();

            await accountSelectionPage[account.selectMethod]();
        });
    }
});
