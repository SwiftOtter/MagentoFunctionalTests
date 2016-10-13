var helper = require('../../utils/helpers');

module.exports = function(test, casper, config) {
    casper.echo('Navigated to page: ' + casper.getCurrentUrl());

    test.assertExists('.product-cart');

    if (casper.exists('.product-cart-options')) {
        test.assertEquals(config.productData.title, casper.fetchText('.product-cart-name'), 'Product name in cart equals product name that was added to cart.');
    } else {
        test.assertEquals(config.productData.sku, casper.getElementAttribute('.product-cart', 'data-sku'), 'SKU in cart equals SKU that was added to cart.');
    }
};