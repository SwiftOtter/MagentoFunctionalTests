var require = patchRequire(require),
    fs = require('fs'),
    auth = require('config/auth'),
    helper = require('utils/helpers'),
    cookiePath = 'temp/cookies-session';

function initializeRobotCookie() {
    var url = casper.cli.options.url || require('config/defaults').baseUrl;

    casper.echo('Setting cookie ' + auth.cookie.name + ' with domain ' + helper.parseDomainFrom(url));

    var successful = phantom.addCookie({
        name: auth.cookie.name,
        value: auth.cookie.value,
        domain: helper.parseDomainFrom(url)
    });

    if (successful === false) {
        casper.warn('May have failed to set robot cookie.');
        // casper.die('Failed to set robot cookie.');
    }
}

function removeRobotCookie() {
    phantom.deleteCookie(auth.cookie.name);
}

function persistCookies() {
    var cookies = JSON.stringify(phantom.cookies);
    fs.write(cookiePath, cookies, 644);
}

function clearAllCookies() {
    phantom.clearCookies();

    if (fs.isFile(cookiePath)) {
        fs.remove(cookiePath);
    }
};

module.exports.shutdown = function() {
    removeRobotCookie();

    if (casper.cli.options['persist-cookies']) {
        persistCookies();
    } else {
        clearAllCookies()
    }
};

module.exports.load = function() {
    initializeRobotCookie();

    if (casper.cli.options['log-cookies']) {
        require('utils').dump(phantom.cookies);
    }

    if (fs.isFile(cookiePath)) {
        var data = fs.read(cookiePath);
        phantom.cookies = JSON.parse(data);
    }
};

module.exports.mageRobotInit = initializeRobotCookie;
module.exports.mageRobotTerminate = removeRobotCookie;
module.exports.persist = persistCookies;
module.exports.clear = clearAllCookies;