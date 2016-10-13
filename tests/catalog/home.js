var helper = require('../../utils/helpers');

module.exports = function(test, casper, defaults) {
    test.assertEqual(defaults.siteTitleSubString, helper.substring(defaults.siteTitleSubString, casper.getTitle()));
    // test.assertExists('h1');
    test.assertExists('.logo-image', 'logo exists');
    test.assertExists('a[href*="customer/account"]', 'has at least one link to the customer account');
    test.assertExists('#search', 'search exists');
    test.assertExists('.nav-header-link', 'has at least one header link');
    test.assertExists('a[href*="checkout"]', 'has at least one link to the checkout or cart');

    var linkToClick = casper.evaluate(function(pickRandomElement) {
        return pickRandomElement('.nav-header-default .nav-header-link', 'href');
    }, helper.pickRandomElement);

    casper.echo(linkToClick);
    casper.click('a[href="'+ linkToClick +'"]');
};