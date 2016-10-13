module.exports = function (test) {
    this.echo('Navigated to page: ' + this.getCurrentUrl());

    test.assertExists('h1');
    test.assertExists('a[href*="customer/account/create"]', 'Has link to create customer account');
    this.click('a[href*="customer/account/create"]');
};