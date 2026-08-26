'use strict';

// configures browsers to run test against
// any of [ 'ChromeHeadless', 'Chrome', 'Firefox', 'IE', 'PhantomJS' ]
var browsers =
  (process.env.TEST_BROWSERS || 'ChromeHeadless')
    .replace(/^\s+|\s+$/, '')
    .split(/\s*,\s*/g);


var suite = 'test/suite.js';

module.exports = function(karma) {
  karma.set({

    frameworks: [ 'mocha' ],

    files: [
      suite,
    ],

    reporters: [ 'progress' ],

    preprocessors: {
      [suite]: [ 'webpack' ]
    },

    browsers,

    browserNoActivityTimeout: 30000,

    singleRun: true,
    autoWatch: false,

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(css|bpmn)$/,
            use: 'raw-loader'
          }
        ]
      }
    }
  });
};