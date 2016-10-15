
module.exports = function(test) {
    casper.otter.echoSuite('Cart');

    var options = this.options;

    test.assertExists('.product-cart');

    if (this.exists('.product-cart-options')) {
        test.assertEquals(options.productData.title, this.fetchText('.product-cart-name'), 'Product name in cart equals product name that was added to cart.');
    } else {
        test.assertEquals(options.productData.sku, this.getElementAttribute('.product-cart', 'data-sku'), 'SKU in cart equals SKU that was added to cart.');
    }
};