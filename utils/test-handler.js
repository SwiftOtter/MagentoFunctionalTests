var require = patchRequire(require),
    logs = require('utils/logs'),
    configFile = require('utils/config').load(),
    cookies = require('utils/cookies'),
    helper = require('utils/helpers');

function initializeEventHandlers() {
    casper.on("resource.error", logs.errorMessage.bind(logs));
    casper.on("remote.message", logs.remoteMessage.bind(logs));
    casper.on("log", logs.logMessage.bind(logs));
}

module.exports.prepare = function() {
    initializeEventHandlers();
    cookies.load();

    casper.otter = helper;
    casper.otterCapture = require('utils/screen-capture');
    casper.options.env = require(configFile);
    casper.options.auth = require('config/auth');
    casper.options.clientScripts.push('config/defaults.js');
    casper.options.clientScripts.push('client/functions.js');
    casper.options.baseUrl = casper.cli.options.url || casper.options.env.baseUrl;
    casper.options.pathOptions = helper.determinePathOptions(casper.cli.options);
};

module.exports.shutdown = function() {
    cookies.shutdown();
    logs.save();
};

module.exports.startupUrl = function() {
    var pathOptions = helper.determinePathOptions(casper.cli.options),
        startupUrl = casper.options.baseUrl;

    if (pathOptions.key) {
        casper.echo('Running with '+ casper.otter.colorParam(pathOptions.key) +' option.');
        startupUrl += pathOptions.path;
    }

    casper.echo('Initializing on URL: ' + casper.otter.colorParam(startupUrl));

    return startupUrl;
};