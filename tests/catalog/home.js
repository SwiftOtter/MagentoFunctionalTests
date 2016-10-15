var require = patchRequire(require);
var helper = require('utils/helpers');

module.exports = function(test) {

    casper.otter.echoSuite('Home page');
    var env = this.options.env;

    test.assertEqual(env.siteTitleSubString, helper.substring(env.siteTitleSubString, this.getTitle()));

    // test.assertExists('h1');
    test.assertExists('.logo-image', 'logo exists');
    test.assertExists('a[href*="customer/account"]', 'has at least one link to the customer account');
    test.assertExists('#search', 'search exists');
    test.assertExists('.nav-header-link', 'has at least one header link');
    test.assertExists('a[href*="checkout"]', 'has at least one link to the checkout or cart');

    var linkToClick = this.evaluate(function() {
        return pickRandomElement('.nav-header-default .nav-header-link', 'href');
    });

    this.echo(linkToClick);
    this.click('a[href="'+ linkToClick +'"]');
};