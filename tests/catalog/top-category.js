var helper = require('../../utils/helpers');

module.exports = function(test, casper, config) {
    casper.echo('Navigated to page: ' + casper.getCurrentUrl());
    test.assertExists('h1');

    if (casper.exists(config.defaults.category.linkClass)) {
        casper.echo('Found product links. May be a normal category.');
        casper.echo('Skipping top category.....');
        return;
    }

    // Grab a random url to test:
    var urlToTarget = casper.evaluate(function(pickRandomElement) {
        var pathArray = window.location.pathname.split('.html');

        return pickRandomElement('.main-container a[href*="'+ pathArray[0] +'"]', 'href');
    }, helper.pickRandomElement);

    test.assertExists('.main-container a[href*="'+ urlToTarget +'"]');
    casper.click('.main-container a[href*="'+ urlToTarget +'"]');  
};