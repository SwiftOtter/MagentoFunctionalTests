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

function getImageFolder() {
    var time = new Date(),
        month = time.getMonth() + 1,
        folder = "screen-captures/"+ time.getFullYear() + month + time.getDate() + time.getHours() + time.getMinutes() +"/";

    if (!fs.isDirectory(folder)) {
        fs.makeDirectory(folder);
    }

    return folder;
}

/**
 * Wrapper around casper's capture to allow an automated save location:
 * @param fileName
 */
module.exports.capture = function(fileName) {
    casper.capture(getImageFolder() + fileName);
};