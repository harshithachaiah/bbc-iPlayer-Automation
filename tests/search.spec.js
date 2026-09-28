const { test } = require("../fixtures/navigation.fixture");
const AccountSelectionPage = require("../pages/account-selection.page");
const SearchPage = require("../pages/search.page");

test.describe("iPlayer Search", () => {

    test("Adult user can navigate to the Search page", async ({
        page,
        navigation
    }) => {
        const accountSelectionPage = new AccountSelectionPage(page);
        const searchPage = new SearchPage(page);

        await page.goto(
            "/tap/telly/iplayer?featureToggles=isUhdCapable",
            {
                waitUntil: "domcontentloaded"
            }
        );

        await accountSelectionPage.selectAdultAccount();

        await navigation.left(1);
        await navigation.down(3);
        await navigation.enter();

        await searchPage.verifySearchPage();
    });


    test("Adult user can search for BBC and open the first result", async ({
        page,
        navigation
    }) => {
        const accountSelectionPage = new AccountSelectionPage(page);
        const searchPage = new SearchPage(page);

        // Open iPlayer
        await page.goto(
            "/tap/telly/iplayer?featureToggles=isUhdCapable",
            {
                waitUntil: "domcontentloaded"
            }
        );

        // Select Adult account
        await accountSelectionPage.selectAdultAccount();

        // Navigate to Search
        await navigation.left(1);
        await navigation.down(3);
        await navigation.enter();

        // Verify Search page
        await searchPage.verifySearchPage();

        // Search for "BBC"
        await navigation.right(1);
        await navigation.enter();
        await navigation.enter();

        await navigation.right(1);
        await navigation.enter();

        // Wait for the search results to actually load
        await searchPage.waitForFirstSearchResult();
        
        // Move to the first search result and select it
        await navigation.down(3);
        await navigation.enter();

       await searchPage.waitForStartWatching();

        // Verify programme
        

        // Press Back
        await navigation.back();
        

    });
});