module.exports = function(test) {
    casper.otter.echoSuite('Product');
    test.assertExists('h1');

    test.assertExists('.qty');
    test.assertExists('.price');
    test.assertExists('.btn-cart');
    test.assertExists('.product-name');
    test.assertExists('.product-image');

    // Product with required options:
    if (this.exists(this.options.env.product.requiredOptionSelector)) {
        this.echo('Found required options');

        var values = this.evaluate(function() {
            return determineProductFormValues();
        });


        this.echo('Choosing values:');
        for (var key in values) {
            this.echo('    '+ key +': '+ values[key]);
        }

        this.fillSelectors('.product-options', values);
        this.otterCapture.capture('after-select.png');
    }

    var selectorToTarget = this.evaluate(function() {
        var allElements = document.querySelectorAll('.qty');

        return '#' +allElements[getRandomIntInclusive(0, allElements.length - 1)].getAttribute('id');
    });

    this.options.productData = {
        sku: this.getElementAttribute(selectorToTarget, 'data-sku'),
        title: this.fetchText('.product-name')
    };

    var formValues = {};
    formValues[selectorToTarget] = '1';

    this.fillSelectors('form#product_addtocart_form', formValues);
    this.echo('Picking sub-product: ' + selectorToTarget);

    this.click('.btn-cart');
    this.waitForResource(/.*checkout\/cart\/add.*/, function () {
        this.echo('Product rejected or added to cart');
        this.otterCapture.capture('after-add.png');
        this.open(this.options.baseUrl + 'checkout/cart');
    });
};