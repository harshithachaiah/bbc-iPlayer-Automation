
const { expect } = require("@playwright/test");

class AccountSelectionPage {

    constructor(page) {
        this.page = page;

        this.adultAccount = page.getByTestId("HasH");
        this.kidsAccount = page.getByTestId("Hash");

        this.adultHeroCard = page.locator(
            'a[id^="hero:"][data-active="true"]'
        );

        this.kidsHeroCard = page.locator(
            'a[id^="4-6-childrens-hero:"][data-active="true"]'
        );
    }

    async navigate() {
        await this.page.goto(
            "/tap/telly/iplayer?featureToggles=isUhdCapable",
            {
                waitUntil: "domcontentloaded"
            }
        );
    }

    async selectAdultAccount() {
        await this.adultAccount.waitFor({
            state: "visible",
            timeout: 10000
        });

        await this.adultAccount.click();

        // Verify navigation to the Adult hero section.
        await expect(this.page).toHaveURL(
            /\/tap\/telly\/iplayer#hero:/
        );

        // Verify focus is on the first Adult hero card.
        await expect(this.adultHeroCard).toBeFocused();
    }

    async selectKidsAccount() {
        await this.kidsAccount.waitFor({
            state: "visible",
            timeout: 10000
        });

        await this.kidsAccount.click();

        // Verify navigation to the Kids hero section.
        await expect(this.page).toHaveURL(
            /\/tap\/telly\/iplayer#4-6-childrens-hero:/
        );

        // Verify focus is on the first Kids hero card.
        await expect(this.kidsHeroCard).toBeFocused();
    }
}

module.exports = AccountSelectionPage;
