var configFile = casper.cli.options.configFile || 'defaults';
var defaults = require('config/' + configFile);
var auth = require('config/auth');
var colorizer = require('colorizer').create('Colorizer');
var baseUrl = casper.cli.options.url || defaults.baseUrl;
var helper = require('./utils/helpers');
var logs = "";


casper.on("resource.error", function(resourceError) {
    logs = logs += "Resource error: " +
        "Error code: "+ resourceError.errorCode +
        "\n ErrorString: "+ resourceError.errorString +
        "\n url: "+ resourceError.url +
        "\n id: "+ resourceError.id +"\n";
});

casper.on('remote.message', function(message) {
    logs = logs += message + "\n";
});

casper.on('log', function(message) {
    logs = logs += message + "\n";
});

function param(text) {
    return colorizer.colorize(text, 'PARAMETER');
}

var cookies = require('utils/cookies');

casper.test.begin('Test that products can be added to cart', {
    setUp: function() {
        cookies.load();
    },

    tearDown: function() {
        if (casper.cli.options['persist-cookies']) {
            cookies.persist();
        } else {
            cookies.clear();
        }
    },

    test: function(test) {
        var config = {
                baseUrl: baseUrl,
                productData: {},
                inputs: casper.cli.options,
                args: casper.cli.args,
                defaults: defaults
            },
            args = config.args,
            pathOptions = helper.determinePathOptions(config.inputs);

        casper.start(baseUrl + pathOptions.path, function() {
            if (pathOptions.key) {
                casper.echo('Running with '+ param(pathOptions.key) +' option.');
            }

            casper.echo('Initializing on URL: ' + casper.getCurrentUrl());
        });

        casper.setHttpAuth(auth.http.user, auth.http.password);

        // Home page
        if (!args['skip-home'] && ['top-category', 'category', 'product'].indexOf(pathOptions.key) < 0) {
            casper.then(function() {
                casper.echo('Running '+ param('home') +' test suite.');
                require('tests/catalog/home')(test, this, defaults);
            });
        }


        // Top Level Category Page
        if (!args['skip-top-category'] && ['category', 'product'].indexOf(pathOptions.key) < 0) {
            casper.then(function() {
                casper.echo('Running '+ param('top category') +' test suite.');
                require('tests/catalog/top-category')(test, this, config);
            });
        }

        // Category Product Listing
        if (!args['skip-category'] && ['product'].indexOf(pathOptions.key) < 0) {
            casper.then(function() {
                casper.echo('Running '+ param('category') +' test suite.');
                require('tests/catalog/category')(test, this, config);
            });
        }

        // Product Page
        if (!args['skip-product']) {
            casper.then(function() {
                casper.echo('Running '+ param('product') +' test suite.');
                config.productData = require('tests/catalog/product')(test, this, config);
            });
        }

        // Cart
        if (!args['skip-cart']) {
            casper.then(function() {
                casper.echo('Running '+ param('cart') +' test suite.');
                require('tests/catalog/cart')(test, this, config);
            });
        }

        casper.run(function() {
            test.done();
            helper.saveLogsToFile(logs);
        });
    }
});