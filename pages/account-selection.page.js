const { expect } = require("@playwright/test");

class AccountSelectionPage {

    constructor(page) {
        this.page = page;

        this.adultAccount = page.getByTestId("HasH");
        this.kidsAccount = page.getByTestId("Hash");
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

        await expect(this.page).toHaveURL(
            "https://www.live.bbctvapps.co.uk/tap/telly/iplayer?featureToggles=isUhdCapable#hero:m002y5lq:0:card"
        );
    }

    async selectKidsAccount() {
        await this.kidsAccount.waitFor({
            state: "visible",
            timeout: 10000
        });

        await this.kidsAccount.click();

        await expect(this.page).toHaveURL(
            "https://www.live.bbctvapps.co.uk/tap/telly/iplayer?featureToggles=isUhdCapable#4-6-childrens-hero:b08bzfnh:0:card"
        );
    }
}

module.exports = AccountSelectionPage;