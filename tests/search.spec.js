
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
        downCount: 4,
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
        await page.waitForTimeout(200);
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
        await page.waitForTimeout(200);
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

// Adult and Kids search results for the default letter A.
for (const account of accounts) {

    test(`${account.name} user can load at least 9 results for default letter A`, async ({
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

        // Allow the Search page to initialise.
        await page.waitForTimeout(1000);

        // Verify A is focused by default.
        await searchPage.verifyDefaultFocusedKey();

        // Select the focused A key.
        await navigation.enter();

        // Verify at least 9 results are rendered.
        await searchPage.verifyMinimumSearchResults(9);

        console.log(
            `${account.name}: Search results rendered:`,
            await searchPage.searchResultLinks.count()
        );
    });
}

// Adult and Kids search keyboard character selection.
for (const account of accounts) {

    test(`${account.name} user can append and delete search characters`, async ({
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

        // Allow the Search page to initialise.
        await page.waitForTimeout(200);

        // // Verify A is focused by default.
        // await expect(page.locator(":focus")).toHaveText("A");

        // Select A.
        await navigation.enter();

        // Verify Search input contains A.
        await searchPage.verifySearchInputValue("A");

        // Move right to B and select.
        await navigation.right();
        await navigation.enter();

        // Verify B is appended.
        await searchPage.verifySearchInputValue("AB");

        // Move right to C and select.
        await navigation.right();
        await navigation.enter();

        // Verify C is appended.
        await searchPage.verifySearchInputValue("ABC");

        // Navigate to Delete (5 times right and 2 times down).
        await navigation.right(5);
        await navigation.down(2);

        // Select Delete.
        await navigation.enter();

        // Verify C has been deleted.
        await searchPage.verifySearchInputValue("AB");
    });

    
}

// Adult and Kids search for a term with no results.
for (const account of accounts) {

    test(`${account.name} user sees no results found when searching for AAA`, async ({
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

        // Allow the Search page to initialise.
        await page.waitForTimeout(200);

        // Select A three times.
        await navigation.enter();
        await searchPage.verifySearchInputValue("A");

        await navigation.enter();
        await searchPage.verifySearchInputValue("AA");

        await navigation.enter();
        await searchPage.verifySearchInputValue("AAA");

        await navigation.enter(5);

        // Verify that no results are found.
        await searchPage.verifyNoResultsFound();
    });
}
