var require = patchRequire(require),
    defaults = require('config/defaults'),
    colorizer = require('colorizer').create('Colorizer');

module.exports = {
    parseDomainFrom: function(url) {
        var parts = url.replace('http://','').replace('https://','').split(/[/?#]/);
        return parts[0];
    },

    substring: function(needle, haystack) {
        return haystack.substring(haystack.indexOf(needle), haystack.indexOf(needle) + needle.length);
    },

    /**
     * Echos suite name and current URL to command. Takes a screen capture.
     *
     * @param suiteName
     */
    echoSuite: function(suiteName) {
        casper.echo('Running '+ colorizer.colorize(suiteName, 'PARAMETER') +' test suite');
        casper.echo('Navigated to page: ' + casper.getCurrentUrl());
        casper.otterCapture.capture(suiteName + '-init.png');
    },

    /**
     * Returns a string with color.
     *
     * @param param
     * @returns {String}
     */
    colorParam: function(param) {
        return colorizer.colorize(param, 'PARAMETER');
    },

    /**
     * Determine if one of the arguments provides maps to an acceptable path.
     *
     * @param inputArgs
     * @returns {*}
     */
    determinePathOptions: function(inputArgs) {
        var targetKey = '',
            key;

        for (key in inputArgs) {
            if (inputArgs.hasOwnProperty(key) && defaults.paths.indexOf(key) > -1) {
                targetKey = key;
            }
        }

        if (inputArgs[targetKey]) {
            return {
                path: inputArgs[targetKey],
                key: targetKey
            };
        }

        return {};
    }
};