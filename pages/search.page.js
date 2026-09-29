const { expect } = require("@playwright/test");

class SearchPage {
    constructor(page) {
        this.page = page;

        this.firstSearchResult = page.locator(
            '[id="search-grid:row_0"] a[data-native="true"]'
        ).first();

       

        this.ctaButton = page.locator(
            'button[aria-labelledby*="cta:"]'
        );
        this.startWatchingButton = page.getByText("Start watching", {
    exact: true
});
    }

    async verifySearchPage() {
        await expect(this.page).toHaveURL(
            /\/tap\/telly\/iplayer\/search\#character-key-a/
        );
    }

    async waitForFirstSearchResult() {
        await expect(this.firstSearchResult).toBeVisible({
            timeout: 15000
        });

        await expect(this.firstSearchResult).toHaveAttribute(
            "data-native",
            "true"
        );
    }


    async waitForStartWatching() {
    await expect(this.startWatchingButton).toBeVisible({
        timeout: 15000
    });
}

   
}

module.exports = SearchPage;