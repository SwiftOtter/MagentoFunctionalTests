var defaults = require('../config/defaults');

module.exports = {
    parseDomainFrom: function(url) {
        var parts = url.replace('http://','').replace('https://','').split(/[/?#]/);
        return parts[0];
    },

    saveLogsToFile: function(logs) {
        var time = new Date();
        var month = time.getMonth() + 1;
        var logFile = "data-"+ time.getFullYear() +"-"+ month +"-"+ time.getDate() +"-"+ time.getHours() +"-"+ time.getMinutes() +".html";

        fs.write(logFile, logs, 'w');
    },

    // TODO: move uses to client/functions instead of here:
    // Deprecated:

    getRandomIntInclusive: function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    substring: function(needle, haystack) {
        return haystack.substring(haystack.indexOf(needle), haystack.indexOf(needle) + needle.length);
    },

    pickRandomElement: function(selector, attribute) {
        var elements = null;

        if (typeof selector !== 'string') {
             elements = selector
        }

        if (elements === null) {
            elements = document.querySelectorAll(selector);
        }

        var targetElement = elements[Math.floor(Math.random() * elements.length)];

        if (!targetElement) {
            targetElement = elements[0];
            console.log('WARNING: choose first element from selector "'+ selector +'"');
        }

        return targetElement.getAttribute(attribute);
    },

    determinePathOptions: function(inputArgs) {
        var targetKey = '';

        for (var key in inputArgs) {
            if (inputArgs.hasOwnProperty(key) && defaults.paths.indexOf(key) > -1) {
                targetKey = key;
            }
        }

        if (inputArgs[key]) {
            return {
                path: inputArgs[targetKey],
                key: targetKey
            };
        }

        return {
            path: '',
            key: '',
        };
    }
};