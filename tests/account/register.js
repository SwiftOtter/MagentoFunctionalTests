var require = patchRequire(require);

module.exports = function (test) {
    this.echo('Navigated to page: ' + this.getCurrentUrl());
    this.echo('Attempting to register account.');

    var env = this.options.env,
        auth = this.options.auth,
        key,
        formValues = {};

    test.assertExists('h1');
    test.assertExists('button[type="submit"]');

    for (key in env.account.register) {
        if (env.account.register.hasOwnProperty(key) && auth.account.hasOwnProperty(key)) {
            formValues[env.account.register[key]] = auth.account[key];
            test.assertExists(env.account.register[key]);
        }
    }

    this.capture('account-register-before-fill.png');
    this.fillSelectors('form#form-validate', formValues, true);
    this.echo('Submitting registration form...');

    this.waitForUrl(/customer\/account\/(index)?(\/)?$/, null, function() {
        this.capture('account-register-after-submit.png');
        this.warn('Waited 20s to register account, but process failed.');
        this.die('There was an error registering account. Shutting down.');
    }, 20000);
};