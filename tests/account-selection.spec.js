const { test } = require("@playwright/test");
const AccountSelectionPage = require("../pages/account-selection.page");

test.describe("BBC iPlayer Account Selection", () => {

    test("User can select Adult account", async ({ page }) => {

        const accountSelectionPage =
            new AccountSelectionPage(page);

        await accountSelectionPage.navigate();

        await accountSelectionPage.selectAdultAccount();
    });


    test("User can select Kids account", async ({ page }) => {

        const accountSelectionPage =
            new AccountSelectionPage(page);

        await accountSelectionPage.navigate();

        await accountSelectionPage.selectKidsAccount();
    });

});