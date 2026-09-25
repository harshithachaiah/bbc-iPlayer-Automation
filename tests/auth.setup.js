const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const environmentName = process.env.TEST_ENV || 'test';

const environments = {
    test: {
    signInUrl:
        'https://www.test.bbctvapps.co.uk/tap/telly/iplayer/account/onboard/pairing/challenge?featureToggles=isUhdCapable#accessible-content'
},

live: {
    signInUrl:
        'https://www.live.bbctvapps.co.uk/tap/telly/iplayer/account/onboard/pairing/challenge?featureToggles=isUhdCapable#accessible-content'
}
};

const environment = environments[environmentName];

if (!environment) {
    throw new Error(
        `Unknown environment: ${environmentName}. Use "test" or "live".`
    );
}

const authDirectory = path.resolve(
    process.cwd(),
    'auth'
);

const authFile = path.join(
    authDirectory,
    `${environmentName}-iplayer-state.json`
);

(async () => {

    console.log('');
    console.log('========================================');
    console.log(
        `BBC iPlayer ${environmentName.toUpperCase()} Authentication`
    );
    console.log('========================================');
    console.log('');

    console.log(`Environment: ${environmentName}`);
    console.log(`Sign-in URL: ${environment.signInUrl}`);
    console.log(`Auth file: ${authFile}`);
    console.log('');

    fs.mkdirSync(authDirectory, {
        recursive: true
    });

    console.log('Starting Google Chrome...');

    const browser = await chromium.launch({
        channel: 'chrome',
        headless: false
    });

    console.log('Google Chrome started.');

    const context = await browser.newContext();

    const page = await context.newPage();

    console.log('Opening BBC iPlayer...');

    await page.goto(
        environment.signInUrl,
        {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        }
    );

    console.log('');
    console.log('BBC iPlayer page loaded.');
    console.log(`Current URL: ${page.url()}`);
    console.log('');

    console.log('========================================');
    console.log(
        `Complete BBC iPlayer ${environmentName.toUpperCase()} authentication`
    );
    console.log('========================================');
    console.log('');
    console.log('Use:');
    console.log('1. QR code authentication');
    console.log('OR');
    console.log('2. Remote sign-in');
    console.log('');
    console.log('After you are successfully signed in:');
    console.log('Return to this terminal and press ENTER.');
    console.log('');
    console.log('========================================');
    console.log('');

    await new Promise((resolve) => {

        process.stdin.resume();

        process.stdin.once('data', () => {
            resolve();
        });

    });

    console.log('');
    console.log('Saving authentication state...');

    await context.storageState({
        path: authFile
    });

    console.log('');
    console.log('========================================');
    console.log('Authentication state saved successfully');
    console.log('========================================');
    console.log('');
    console.log(`Environment: ${environmentName}`);
    console.log(`Authentication file: ${authFile}`);
    console.log('');

    await browser.close();

})();