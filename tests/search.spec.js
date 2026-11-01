
const { test } = require("../fixtures/navigation.fixture");

const AccountSelectionPage = require(
    "../pages/account-selection.page"
);

const SearchPage = require(
    "../pages/search.page"
);

// Account-specific navigation settings.
const accounts = [
    {
        name: "Adult",
        selectMethod: "selectAdultAccount",
        downCount: 3,
        resultDownCount: 3
    },
    {
        name: "Kids",
        selectMethod: "selectKidsAccount",
        downCount: 2,
        resultDownCount: 3
    }
];

// Adult and Kids search for letter A.
for (const account of accounts) {

    test(`${account.name} user can view search results for letter A`, async ({
        page,
        navigation
    }) => {

        const accountSelectionPage =
            new AccountSelectionPage(page);

        const searchPage =
            new SearchPage(page);

        // Open BBC iPlayer.
        await accountSelectionPage.navigate();

        // Select account.
        await accountSelectionPage[account.selectMethod]();

        // Navigate to Search.
        await navigation.left();
        await navigation.down(account.downCount);
        await navigation.enter();

        // Verify Search page.
        await searchPage.verifySearchPage();
        await page.waitForTimeout(500);
        // Select letter A.
        await navigation.enter();

        // Verify search results.
        await searchPage.verifySearchResults();

        console.log(
            `${account.name} search results:`,
            await searchPage.getSearchResultTitles()
        );
    });
}

// Adult and Kids search for BBC and open the first result.
for (const account of accounts) {

    test(`${account.name} user can search for BBC and open the first result`, async ({
        page,
        navigation
    }) => {

        const accountSelectionPage =
            new AccountSelectionPage(page);

        const searchPage =
            new SearchPage(page);

        // Open BBC iPlayer.
        await accountSelectionPage.navigate();

        // Select account.
        await accountSelectionPage[account.selectMethod]();

        // Navigate to Search.
        await navigation.left();
        await navigation.down(account.downCount);
        await navigation.enter();

        // Verify Search page.
        await searchPage.verifySearchPage();
        await page.waitForTimeout(500);
        // Search for BBC.
        await navigation.right();
        await navigation.enter();
        await navigation.enter();

        await navigation.right();
        await navigation.enter();

        // Wait for the first search result.
        await searchPage.waitForFirstSearchResult();

        // Move to the first result and select it.
        await navigation.down(account.resultDownCount);
        await navigation.enter();

        // Verify whether an episode or programme page opened.
        const resultType =
            await searchPage.verifyFirstResultOpened();

        console.log(
            `${account.name} result type:`,
            resultType
        );

        // Navigate back.
        await navigation.back();

        // Verify return to Search.
        await searchPage.verifySearchPage();
    });
}
