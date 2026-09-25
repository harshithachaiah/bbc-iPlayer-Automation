const { defineConfig } = require('@playwright/test');

const environmentName = process.env.TEST_ENV || 'test';

module.exports = defineConfig({

    testDir: './tests',

    timeout: 60 * 1000,

    expect: {
        timeout: 10 * 1000
    },

    fullyParallel: false,

    workers: 1,

    reporter: [
        ['html', { open: 'never' }]
    ],

    use: {

        channel: 'chrome',

        headless: true,

        storageState:
            `auth/${environmentName}-iplayer-state.json`,

        screenshot: 'only-on-failure',

        trace: 'retain-on-failure',

        video: 'retain-on-failure',

        baseURL:
            environmentName === 'live'
                ? 'https://www.live.bbctvapps.co.uk'
                : 'https://www.test.bbctvapps.co.uk'
    }
});