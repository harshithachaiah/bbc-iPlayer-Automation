const { test: base } = require("@playwright/test");

const test = base.extend({
    navigation: async ({ page }, use) => {

        const pressKey = async (key, count = 1) => {
            for (let i = 0; i < count; i++) {
                await page.keyboard.press(key);
            }
        };

        const navigation = {
            up: async (count = 1) => {
                await pressKey("ArrowUp", count);
            },

            down: async (count = 1) => {
                await pressKey("ArrowDown", count);
            },

            left: async (count = 1) => {
                await pressKey("ArrowLeft", count);
            },

            right: async (count = 1) => {
                await pressKey("ArrowRight", count);
            },

            enter: async (count = 1) => {
                await pressKey("Enter", count);
            },

            back: async (count = 1) => {
                await pressKey("Backspace", count);
            }
        };

        await use(navigation);
    }
});

module.exports = { test };