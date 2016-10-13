var helper = require('../../utils/helpers');

module.exports = function(test, casper, config) {
    casper.echo('Navigated to page: ' + casper.getCurrentUrl());
    test.assertExists('h1');

    var urlToTarget = casper.evaluate(function(getRandomIntInclusive, linkClass) {
        var allUrls = document.querySelectorAll(linkClass);

        return allUrls[getRandomIntInclusive(0, allUrls.length - 1)].getAttribute('href');
    }, helper.getRandomIntInclusive, config.defaults.category.linkClass);

    test.assertExists(config.defaults.category.linkClass);

    // Click one of the product links:
    casper.click(config.defaults.category.linkClass + '[href*="'+ urlToTarget +'"]');
};