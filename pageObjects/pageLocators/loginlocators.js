'use strict';
const ibmProfileLink = element(by.css('.ibm-profile-link'));
const myIbm = element(by.css('.ibm-active li:nth-child(1)'));
const userName = element(by.css('[id="username"]'));
const continueButton = element(by.css('[id="continue-button"]'));
const password = element(by.css('[id="password"]'));
const loginButton = element(by.css('[id="signinbutton"]'));
const errorMessage = element(by.css('[id="password-error-msg"]'));

module.exports = {
    IBMPROFILELINK: ibmProfileLink,
    MYIBM: myIbm,
    USERNAME: userName,
    CONTINUEBUTTON: continueButton,
    PASSWORD: password,
    LOGINBUTTON: loginButton,
    ERRORMESSAGE: errorMessage
};