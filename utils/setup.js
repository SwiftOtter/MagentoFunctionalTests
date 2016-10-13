var Casper = require('../node_modules/casperjs/tests/run.js').Casper,
    utils = require('utils');

var MageCasper = function() {
    MageCasper.super_.apply(this, arguments);
};

utils.inherits(MageCasper, Casper);

MageCasper.data = require('../config/defaults');

module.exports = MageCasper();