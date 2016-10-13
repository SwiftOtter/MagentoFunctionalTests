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
 * @copyright Swift Otter Studios, 10/13/16
 */
module.exports = function(test) {
    this.echo('Navigated to page: ' + this.getCurrentUrl());

    test.assertExists('h1');
    test.assertExists('a[href*="customer/account/logout"]');

    this.click('a[href*="customer/account/logout"]');
    this.echo('Logging out of user...');
    this.waitForUrl(this.options.baseUrl);
};