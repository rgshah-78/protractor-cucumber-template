Prerequisite:
1. We need to have protractor-flake 3.0.1 or above package to achieve this.
2. In our framework we need to have shardTestFiles : true.

Observation:
1.  In order to rerun feature files of failed test cases, we need to use “protractor-flake --parser cucumber --node-bin node --max-attempts=2 -- conf.js” instead of “protractor conf.js”
2.  It is rerunning the scenarios based on uri (feature file)
3.  If test are running in as 'shardTestFiles' : true,'maxInstances' : 1, then max-attempts should be n-times. “protractor-flake --parser cucumber --node-bin node --max-attempts=3 -- conf.js”

Current Problem :
1.  Currently json files are generated such as cucumber-report.pid.json so in report it display both pass and fail scenarios.
2.  Protractor-flake will not be able to rerun only fail testcase. it is running whole feature file containing that fail test case.
3. 	If test are running in parallel as 'shardTestFiles' : true,'maxInstances' : 2, then max-attempts should not be more then 2. “protractor-flake --parser cucumber --node-bin node --max-attempts=2 -- conf.js”

Suggestion :
1.  We need to generate json files as cucumber-report.featureName.json instead of cucumber-report.pid.json so we don’t have fail and pass test cases in a report.
2.  We can put all flaky test in flaky.feature file to run less number of tests as it is rerunning whole feature file.
3.  we can create flake.js file and use ./flake.js -- conf.js command instead of long command like "protractor-flake --parser cucumber --node-bin node --max-attempts=2 -- conf.js instead of protractor conf.js". However it is not working on windows machine, we need to try it on mac.
