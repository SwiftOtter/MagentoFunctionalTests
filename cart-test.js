var require = patchRequire(require),
    testHandler = require('utils/test-handler');

casper.test.begin('Test that products can be added to cart', {
    setUp: function() {
        testHandler.prepare();
    },

    tearDown: function() {
        testHandler.shutdown();
    },

    test: function(test) {
        var args = casper.cli.args,
            pathOptions = casper.options.pathOptions;

        casper.start(testHandler.startupUrl());
        casper.setHttpAuth(casper.options.auth.http.user, casper.options.auth.http.password);

        if (!args['skip-home'] && ['top-category', 'category', 'product'].indexOf(pathOptions.key) < 0) {
            casper.then(require('tests/catalog/home').bind(casper, test));
        }

        if (!args['skip-top-category'] && ['category', 'product'].indexOf(pathOptions.key) < 0) {
            casper.then(require('tests/catalog/top-category').bind(casper, test));
        }

        if (!args['skip-category'] && ['product'].indexOf(pathOptions.key) < 0) {
            casper.then(require('tests/catalog/category').bind(casper, test));
        }

        if (!args['skip-product']) {
            casper.then(require('tests/catalog/product').bind(casper, test));
        }

        if (!args['skip-cart']) {
            casper.then(require('tests/catalog/cart').bind(casper, test));
        }

        casper.run(function() {
            test.done();
        });
    }
});