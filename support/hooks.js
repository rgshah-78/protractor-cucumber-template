'use strict';
const {defineSupportCode} = require('cucumber');

defineSupportCode(function({After}) {
    After(function(scenario) {
        if (scenario.isFailed()) {
            let attach = this.attach;
            return browser.takeScreenshot().then(function (png) {
                let decodedImage = new Buffer(png, "base64");
                browser.manage().logs()
                .get('browser').then(function(browserLog) {
                    attach('log: ' +
                        require('util').inspect(browserLog));
                });
                return attach(decodedImage, "image/png");

            });
        }
    });
});
