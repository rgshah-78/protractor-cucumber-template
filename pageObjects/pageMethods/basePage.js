'use strict';

var ec = protractor.ExpectedConditions;

var BasePage = function () {}

    /**
     * Enters text into a textfield
     *
     */


    BasePage.prototype.type = function(locator,text) {
      return locator.sendKeys(text)
    };

    /**
     * Gets the current title of the loaded page
     * @returns {Promise}
     */

    BasePage.prototype.getTitle = function() {
      return browser.getTitle();
    };
    /**
     * Gets the current URL of the loaded page
     * @returns {Promise}
     */

    BasePage.prototype.getCurrentUrl = function() {
      return browser.getCurrentUrl();
    };

    /**
     * Loads a given URL
     * @returns {Promise}
     */

    BasePage.prototype.gotoUrl = function(url) {
      return browser.get(url);
    };

    /**
     * Method to scroll to an element
     */

    BasePage.prototype.scrollTo = function(locator) {
      browser.actions().mouseMove(locator).perform();
    };

    /**
     * Method to clear a textfield
     */

    BasePage.prototype.clearInputField = function(locator) {
      locator.clear();
    };

    BasePage.prototype.getTextFrom = function (element) {
        return element.getText();
    };

    /**
     * Method to click on a webelement
     */

    BasePage.prototype.click = function(locator) {
      return locator.click();
    };

    BasePage.prototype.isElementVisible = function(locator,waitTime) {
      return browser.wait(ec.visibilityOf(locator), waitTime);
    };

module.exports = BasePage;
