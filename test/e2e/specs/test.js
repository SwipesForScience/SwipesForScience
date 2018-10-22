// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

import firebase from 'firebase';

module.exports = {
  'register test': function test(browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;

    browser
      /*
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.hello')
      .assert.containsText('h1', 'Welcome to Your Vue.js App')
      .assert.elementCount('img', 1)
      .end();
      */
      .url(devServer)
      .waitForElementVisible('#app', 1000)
      .waitForElementVisible('#nav_collapse > ul.navbar-nav.ml-auto > li.nav-item > a.nav-link', 2000)
      .click('#nav_collapse > ul.navbar-nav.ml-auto > li.nav-item > a.nav-link')
      .waitForElementVisible('div#login > div#signupForm.container.fluid > p.mt-3 > a', 1000)
      .click('div#login > div#signupForm.container.fluid > p.mt-3 > a')
      .click('button#openConsent')
      .pause(1000)
      .click('button[type=submit]')
      .pause(1000)
      .setValue('#emailAddress', 'bidon@add.fr')
      .setValue('#usernameInput', 'Antoine')
      .setValue('#passwordInput', 123456)
      .setValue('#password2Input', 123456)
      .click('button[type=submit]')
      .pause(1000)
      .api.perform(() => {
        // We check if user is registered afterward
        firebase.auth().signInWithEmailAndPassword('bidon@add.fr', '123456');
        // We need to mock the firebase connection
      });
  },
};
