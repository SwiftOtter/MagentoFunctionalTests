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

    this.echo('Attempting to login.');
    this.capture('account-login-before-fill.png');

    var env = this.options.env,
        auth = this.options.auth,
        key,
        formValues = {};

    for (key in env.account.login) {
        if (env.account.login.hasOwnProperty(key) && auth.account.hasOwnProperty(key)) {
            formValues[env.account.login[key]] = auth.account[key];
            test.assertExists(env.account.login[key]);
        }
    }

    this.capture('account-login-before-fill.png');
    this.fillSelectors('form#login-form', formValues, true);
    this.echo('Submitting login form...');

    this.waitForUrl(/customer\/account\/(index)?(\/)?$/, null, function() {
        this.capture('account-login-after-submit.png');
        this.die('There was an error logging into the account. Shutting down.');
    });
};