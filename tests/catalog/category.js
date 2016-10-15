module.exports = function(test) {
    casper.otter.echoSuite('Category');
    var env = this.options.env;
    test.assertExists('h1');

    var urlToTarget = this.evaluate(function() {
        var allUrls = document.querySelectorAll(defaults.category.linkClass);

        return allUrls[getRandomIntInclusive(0, allUrls.length - 1)].getAttribute('href');
    });

    test.assertExists(env.category.linkClass);

    // Click one of the product links:
    this.click(env.category.linkClass + '[href*="'+ urlToTarget +'"]');
};