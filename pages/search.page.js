
const { expect } = require("@playwright/test");

class SearchPage {

    constructor(page) {
        this.page = page;

        // Search results container.
        this.searchGrid = page.locator("#search-grid");

        // All programme result links.
        this.searchResultLinks = page.locator(
            '#search-grid a[data-native="true"]'
        );

        // Programme titles.
        this.searchResultTitles =
            this.searchResultLinks.locator("h3");

        // First programme in the results.
        this.firstSearchResult =
            this.searchResultLinks.first();

        // Start watching CTA.
        this.startWatchingButton = page.getByText(
            "Start watching",
            { exact: true }
        );

        // Video player controls.
        this.playerControls = page.locator(
            'div[class*="_controls-gradient-bottom_"]'
        );

        // Search input field.
this.searchInput = page.locator("#searchbox_input");
    }

    // Verify that the Search page has opened.
    async verifySearchPage() {
        await expect(this.page).toHaveURL(
            /\/tap\/telly\/iplayer\/search/
        );
    }

    // Wait for search results and verify they are displayed.
    async verifySearchResults() {

        await expect(this.searchGrid).toBeVisible({
            timeout: 30000
        });

        await expect(this.firstSearchResult).toBeVisible({
            timeout: 30000
        });

        const resultCount =
            await this.searchResultTitles.count();

        expect(resultCount).toBeGreaterThan(0);

        // Verify every result has a title.
        for (let i = 0; i < resultCount; i++) {

            const title = (
                await this.searchResultTitles
                    .nth(i)
                    .innerText()
            ).trim();

            expect(title.length).toBeGreaterThan(0);
        }
    }

    // Wait for the first search result.
    async waitForFirstSearchResult() {

        await expect(this.firstSearchResult).toBeVisible({
            timeout: 30000
        });

        await expect(this.firstSearchResult).toHaveAttribute(
            "data-native",
            "true"
        );
    }

    // Detect whether an episode or programme page opened.
    async verifyFirstResultOpened() {

        const destination = this.startWatchingButton
            .or(this.playerControls)
            .first();

        await expect(destination).toBeVisible({
            timeout: 30000
        });

        if (await this.playerControls.isVisible()) {
            console.log("First result opened directly in the video player.");
            return "episode";
        }

        if (await this.startWatchingButton.isVisible()) {
            console.log("First result opened the programme page.");
            return "programme";
        }

        throw new Error(
            "Neither the video player nor the Start watching button was found."
        );
    }

    // Return all displayed programme titles.
    async getSearchResultTitles() {

        await this.verifySearchResults();

        return this.searchResultTitles.allInnerTexts();
    }

    // Verify that the A key is focused by default.
async verifyDefaultFocusedKey() {
    const focusedElement = this.page.locator(
        ':focus'
    );

    await expect(focusedElement).toHaveText("A");
}

// Verify that at least 9 search results are rendered in the DOM.
async verifyMinimumSearchResults(expectedCount = 9) {

    await expect.poll(
        async () => await this.searchResultLinks.count(),
        {
            message: `Expected at least ${expectedCount} search results in the DOM`,
            timeout: 30000
        }
    ).toBeGreaterThanOrEqual(expectedCount);
}
// Verify the value displayed in the Search input.
async verifySearchInputValue(expectedValue) {

    await expect(this.searchInput).toHaveText(
        expectedValue,
        {
            timeout: 10000
        }
    );
}
}

module.exports = SearchPage;
