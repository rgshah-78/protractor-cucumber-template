#!/usr/bin/env node

// Note : This is not working in Windows (https://github.com/NickTomlin/protractor-flake/issues/66) but it should work with linux and mac.

// Run command from terminal :   ./flake.js -- conf.js

var protractorFlake = require('protractor-flake');
// skip first two args (node and self)
var protractorArgs = process.argv.splice(2);

protractorFlake({
    protractorPath: '../node_modules/.bin/protractor',
    maxAttempts: 2,
    parser: 'cucumber',
    nodeBin: 'node',
    protractorArgs: protractorArgs
}, function(status, output) {
    process.exit(status);
});
