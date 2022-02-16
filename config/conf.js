exports.config = {
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  directConnect:true,
  getPageTimeout: 60000,
  allScriptsTimeout: 500000,
  framework: 'custom',

  frameworkPath: require.resolve('protractor-cucumber-framework'),
    capabilities: {
        'browserName': 'chrome',
        // The below options are to make sure that we hide the password manager
        chromeOptions: {
            prefs: {
                'credentials_enable_service': false,
                'profile': {
                    'password_manager_enabled': false
                }
            }
        },
        shardTestFiles:true,
        maxInstances:1
    },
    'loggingPrefs': {

        'browser': 'FINE'
    },


    specs: ['../features/*.feature'], // Spec patterns are
    // relative to this
    // directory.

    baseUrl: "https://www.ibm.com/br-pt",

    params: {
        waits: {
            ecWaitTime: 5000
        },
        title: {
            titleValue: 'IBM - Brasil | IBM'
        }

    },
    ignoreUncaughtExceptions: true,

    beforeLaunch: function() {
        let fs = require('fs');
        if (!fs.existsSync('html_reports')) {
            fs.mkdirSync('html_reports');
        }
        if (!fs.existsSync('json_reports')) {
            fs.mkdirSync('json_reports');
        }

    },

    onPrepare: function () {

        let chai = require('chai');
        chai.use(require('chai-as-promised'));
        global.should = chai.should;
        global.expect = chai.expect;
        global.assert = require('chai').assert;
        reportObject = require('../config/consolidatedReport.js');
        browser.driver.manage().window().maximize();
        browser.waitForAngularEnabled(false);
    },

    cucumberOpts: {
        require: ['../support/hooks.js', '../stepDefinitions/*.js'],
        format: ['json:json_reports/cucumber_report.json'],
        profile: false,
        'no-source': true

    },

    onComplete: function () {
        try{
            reportObject.consolidatedReportFiles();
        }
        catch(e){
            console.log("Error while creating consolidation Report files >"+e);
        }

        console.log('all tests of feature files are finished');
    },

    afterLaunch: function () {

        let createHtmlReport = function () {
            let reporter = require('cucumber-html-reporter');

            let options = {
                theme: 'bootstrap',
                jsonDir: 'json_reports',
                output: './html_reports/cucumber_report.html',
                ignoreBadJsonFile:true,
                name: 'protractor-cucumber-e2e-tests',
            };

            reporter.generate(options);
        };

        try{
            createHtmlReport();
        }
        catch(e){
            console.log("Error in generating reports keep calm and carry on");
        }

        console.log('all tests have finished');
    }

};
