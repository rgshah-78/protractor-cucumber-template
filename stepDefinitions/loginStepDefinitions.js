const loginPage = require('../pageObjects/pageMethods/loginPage.js');

const {defineSupportCode}   = require("cucumber");

defineSupportCode(function({Given,When,Then, setDefaultTimeout}) {
    setDefaultTimeout(10*1000);
    Given('I have opened base url in browser', function () {
        return loginPage.isHomePageLoaded(browser.baseUrl);
    });

    Given('I have opened login page', function () {
        return loginPage.isLoginPageLoaded();
    });

    When('I enter user as {stringInDoubleQuotes}', function (userName) {
        return loginPage.enterUserName(userName);
    });

    When('I enter password as {stringInDoubleQuotes}', function (password) {
        return loginPage.enterPassword(password);
    });

    Then('I should see error message as {stringInDoubleQuotes}', function (message) {
       return assert.eventually.equal(loginPage.verifyErrorMessage(),message,"Failed : Error message is not displayed");
    });

});

