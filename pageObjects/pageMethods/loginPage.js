'use strict';
let LoginLocators = require('./../pageLocators/loginlocators.js');
let BasePage = require('./basePage.js');

let LoginPage = new BasePage();

LoginPage.isHomePageLoaded = isHomePageLoaded;
LoginPage.isLoginPageLoaded = isLoginPageLoaded;
LoginPage.enterUserName = enterUserName;
LoginPage.enterPassword = enterPassword;
LoginPage.verifyErrorMessage = verifyErrorMessage;


function isHomePageLoaded(url) {
    return LoginPage.gotoUrl(url).then(()=>{
        return LoginPage.getTitle().then(title =>{
            if (title === browser.params.title.titleValue){
                console.log("Page Loaded Successfully");
                return Promise.resolve(true);
            }
        });
    }).catch(err =>{
        console.log("Error while navigating to the base url page ",err);
        return Promise.reject(err);
    });
}

function isLoginPageLoaded() {
    return LoginPage.isElementVisible(LoginLocators.IBMPROFILELINK).then(()=>{
        return LoginPage.click(LoginLocators.IBMPROFILELINK).then(()=>{
            return LoginPage.isElementVisible(LoginLocators.MYIBM).then(()=>{
                return LoginPage.click(LoginLocators.MYIBM).then(()=>{
                    return Promise.resolve(true);
                });
            });
        });
    }).catch(err =>{
          console.log("Error while navigating to the login page ",err);
          return Promise.reject(err);
    });
}

function enterUserName(userName) {
    return LoginPage.isElementVisible(LoginLocators.USERNAME).then(()=>{
        return LoginPage.type(LoginLocators.USERNAME,userName).then(()=>{
            return LoginPage.click(LoginLocators.CONTINUEBUTTON).then(()=>{
                return Promise.resolve(true);
            });
        });
    }).catch(err =>{
          console.log("Error in enterUserName function",err);
          return Promise.reject(err);
    });
}

function enterPassword(password) {
    return LoginPage.isElementVisible(LoginLocators.PASSWORD,browser.params.waits.ecWaitTime).then(()=>{
        return LoginPage.type(LoginLocators.PASSWORD,password).then(()=>{
            return LoginPage.click(LoginLocators.LOGINBUTTON).then(()=>{
                return Promise.resolve(true);
            });
        });
    }).catch(err =>{
          console.log("Error in enterPassword function",err);
          return Promise.reject(err);
    });
}

function verifyErrorMessage(){
    return LoginPage.isElementVisible(LoginLocators.ERRORMESSAGE,browser.params.waits.ecWaitTime).then(()=>{
        return LoginPage.getTextFrom(LoginLocators.ERRORMESSAGE).then((text)=>{
            console.log(text);
            return Promise.resolve(text);
        });
    }).catch(err =>{
        console.log("Error in verifyErrorMessage function",err);
        return Promise.reject(err);
    });
}

module.exports = LoginPage;
