
module.exports = function(test) {
    casper.otter.echoSuite('top category');
    test.assertExists('h1');

    if (this.exists(this.options.env.category.linkClass)) {
        this.echo('Found product links. May be a normal category.');
        this.echo('Skipping top category.....');
        return;
    }

    // Grab a random url to test:
    var urlToTarget = this.evaluate(function() {
        var pathArray = window.location.pathname.split('.html');

        return pickRandomElement('.main-container a[href*="'+ pathArray[0] +'"]', 'href');
    });

    test.assertExists('.main-container a[href*="'+ urlToTarget +'"]');
    this.click('.main-container a[href*="'+ urlToTarget +'"]');  
};