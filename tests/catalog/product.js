var helper = require('../../utils/helpers');

var requiredOptionsSelector = '.product-options .required-entry';

function determineValues() {
    var required = document.querySelectorAll('.product-options .required-entry'),
        formValues = {};

    for (var i = 0; i < required.length; i++) {
        if (required[i].tagName.toLowerCase() === 'select' || // select OR radio or checkbox
            (required[i].tagName.toLowerCase() === 'input' && ['radio', 'checkbox'].indexOf(required[i].getAttribute('type')) > -1)) {
            formValues['#' + required[i].getAttribute('id')] = required[i].options[1].value;
        } else {
            if (required[i].tagName.toLowerCase() === 'input' && required[i].getAttribute('type') === 'number') { // number input
                formValues['#' + required[i].getAttribute('id')] = 2;
            } else {
                formValues['#' + required[i].getAttribute('id')] = 'casperjs test'; // regular input
            }
        }
    }

    return formValues;
}

module.exports = function(test, casper, config) {
    casper.echo('Navigated to page: ' + casper.getCurrentUrl());
    test.assertExists('h1');

    test.assertExists('.qty');
    test.assertExists('.price');
    test.assertExists('.btn-cart');
    test.assertExists('.product-name');
    test.assertExists('.product-image');

    // Product with required options:
    if (casper.exists(requiredOptionsSelector)) {
        casper.echo('Found required options');

        var values = casper.evaluate(function(determineValues) {
            return determineValues();
        }, determineValues);


        casper.echo('Choosing values:');
        for (var key in values) {
            casper.echo('    '+ key +': '+ values[key]);
        }

        casper.fillSelectors('.product-options', values);
        casper.capture('after-select.png');
    }

    var selectorToTarget = casper.evaluate(function(getRandomIntInclusive) {
        var allElements = document.querySelectorAll('.qty');

        return '#' +allElements[getRandomIntInclusive(0, allElements.length - 1)].getAttribute('id');
    }, helper.getRandomIntInclusive);

    config.productData = {
        sku: casper.getElementAttribute(selectorToTarget, 'data-sku'),
        title: casper.fetchText('.product-name')
    };

    var formValues = {};
    formValues[selectorToTarget] = '1';

    casper.fillSelectors('form#product_addtocart_form', formValues);
    casper.echo('Picking sub-product: ' + selectorToTarget);

    casper.click('.btn-cart');
    casper.waitForResource(/.*checkout\/cart\/add.*/, function () {
        casper.echo('Product rejected or added to cart');
        casper.capture('after-add.png');
        casper.open(config.baseUrl + 'checkout/cart');
    });

    return config.productData;
};