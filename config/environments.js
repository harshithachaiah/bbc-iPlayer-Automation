const environments = {
    test: {
        baseUrl: "https://www.test.bbctvapps.co.uk/tap/telly/iplayer?featureToggles=isUhdCapable",
        signInUrl: "https://account.bbc.com/signin"
    },

    live: {
        baseUrl: "https://www.live.bbctvapps.co.uk/tap/telly/iplayer?featureToggles=isUhdCapable",
        signInUrl: "https://account.bbc.com/signin"
    }
};

const environmentName = process.env.TEST_ENV || "test";

module.exports = environments[environmentName];