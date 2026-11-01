
const { test: base } = require("@playwright/test");

const test = base.extend({
    navigation: async ({ page }, use) => {

        const pressKey = async (key, count = 1) => {
            for (let i = 0; i < count; i++) {
                await page.keyboard.press(key);
            }
        };

        const navigation = {
            up: (count = 1) => pressKey("ArrowUp", count),
            down: (count = 1) => pressKey("ArrowDown", count),
            left: (count = 1) => pressKey("ArrowLeft", count),
            right: (count = 1) => pressKey("ArrowRight", count),
            enter: (count = 1) => pressKey("Enter", count),
            back: (count = 1) => pressKey("Backspace", count)
        };

        await use(navigation);
    }
});

module.exports = { test };
