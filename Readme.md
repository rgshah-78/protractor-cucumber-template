### protractor cucumber framework

A framework which is written on top of protractor and cucumber. Apps that are written in angular or non angular
can make use of this framework to write selenium tests.

# required .npmrc file in home folder location with file contains as "registry=https://registry.npmjs.org"

# run protractor conf.js file from config folder

## Features
1. Ability to run against multiple browsers.
2. Ability to run tests in Parallel.
3. Ability to generate html reports
4. Ability to generate junit xml(to be consumed by jenkins).
5. Provides structure to write maintainable e2e tests.

## How to run

To be able to run this bootstrap project

1. Clone this repo.
2. Install the dependencies using `npm install`
3. Start the webdriver using `webdriver-manager start`
4. Run the tests using `protractor conf.js`

## Configuring tests.

The test run are controlled by a configuration file `conf.js`
Some of the important parameters are

1. `seleniumAddress`:`<address of selenium server>`
2. `framework`:`<framework that you intend to use , in our our case we use custom>`
3. `specs`:`Relative path to feature files`
4. `cucumberOpts`:`<Cucumber runner config>`

You can read about it in more details [here](https://github.com/angular/protractor/blob/master/lib/config.ts)

### Generating reports
The framework can generate reports in three formats
1. json
2. xml
3. html

We use [cucumber-html-reporter](https://github.com/gkushang/cucumber-html-reporter) for generating reports , the configuration of the same is done in `hooks.js`

```
var options = {
        theme: 'bootstrap',
        jsonFile: 'json_reports/cucumber_report.json',
        output: 'html_reports/cucumber_report.html',
        reportSuiteAsScenarios: true,
        launchReport: false,
        name:'protractor-cucumber-test',
        metadata: {
            "App Version":"0.3.2",
            "Test Environment": "STAGING",
            "Browser":"chrome",
            "Platform": "Windows 10",
            "Parallel": "Scenarios",
            "Executed": "Remote"
        }
    };

```

The json reports are generated in `json_reports` folder and the html reports are generated in `html_reports` folder.

For generating XML reports we use command `cat json_reports/cucumber_report.json | ./node_modules/.bin/cucumber-junit > cucumber_report.xml` .

Running tests in Parallel

Selenium tests can be slow on order to speed up the execution, we use concept of shards for running the tests in parallel , where in we split the tests into different feature files in order to enable the tests to run in parallel.

```
capabilities: {
  'browserName': 'chrome',
  'shardTestFiles': true, // This should be set to true to enable || test run
  'maxInstances':3 // Number of browser instances to be spun
},
```
## Todo

1. <del> Update Wiki </del> Done
2. <del> Add helper methods for common action in BasePage </del> Done
