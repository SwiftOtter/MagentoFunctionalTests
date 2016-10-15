/**
 * SwiftOtter_Base is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SwiftOtter_Base is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with SwiftOtter_Base. If not, see <http://www.gnu.org/licenses/>.
 *
 * Copyright: 2016 (c) SwiftOtter Studios
 *
 * @author Jesse Maxwell
 * @copyright Swift Otter Studios, 10/15/16
 */

var require = patchRequire(require),
    fs = require('fs');

var Log = function() {
    var time = new Date();
    var month = time.getMonth() + 1;
    this.logFile = "logs/test-"+ time.getFullYear() + month + time.getDate() + time.getHours() + time.getMinutes() +".log";
    this.log = [];
};

Log.prototype.errorMessage = function(errorObj) {
    this.log.push("Resource error: " +
        "Error code: "+ errorObj.errorCode +
        "\n ErrorString: "+ errorObj.errorString +
        "\n url: "+ errorObj.url +
        "\n id: "+ errorObj.id);
};

Log.prototype.remoteMessage = function(message) {
    this.log.push(message);
};

Log.prototype.logMessage = function(message) {
    this.log.push(message);
};

Log.prototype.save = function() {
    fs.write(this.logFile, this.log, 'w');
};

module.exports = new Log();