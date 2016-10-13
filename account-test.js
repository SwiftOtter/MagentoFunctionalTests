var utils = require('utils'),
    cookies = require('utils/cookies');

casper.options.env = require('config/defaults');
casper.options.auth = require('config/auth');
casper.options.clientScripts.push('config/defaults.js');
casper.options.clientScripts.push('client/functions.js');

var env = casper.options.env;

casper.options.baseUrl = casper.cli.options.url || env.baseUrl;

casper.test.begin('Test that account creation and log in works', {
    setUp: function() {
        cookies.load();
    },

    tearDown: function() {
        cookies.shutdown();
    },

    test: function(test) {
        casper.start(casper.options.baseUrl);
        casper.setHttpAuth(casper.options.auth.http.user, casper.options.auth.http.password);

        casper.then(require('tests/account/home').bind(casper, test));
        casper.then(require('tests/account/pre-register').bind(casper, test));
        casper.then(require('tests/account/register').bind(casper, test));
        casper.then(require('tests/account/dashboard').bind(casper, test));
        casper.then(require('tests/account/login').bind(casper, test));
        casper.then(require('tests/account/post-login').bind(casper, test));

        casper.run(function() {
            test.done();
        });
    }
});