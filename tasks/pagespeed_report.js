/*
 * grunt-pagespeed-report
 * https://github.com/lwhiteley/grunt-pagespeed-report
 *
 * Copyright (c) 2014 Layton Whiteley
 * Licensed under the MIT license.
 */

'use strict';
var _ = require('lodash'),
    validUrl = require('valid-url');

var util = require('./config/util/util');
var runPageSpeedTests = require('./config/executeTests');

var async = require("async");

module.exports = function(grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('pagespeedReport', 'This plugin will run pagespeed tests on urls and generate an html report', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      reporters: [],
      paths: [],
      locale: 'en_US',
      threshold: 80,
      title: 'PageSpeed Insight',
      testHome: true,
      dest: '.reports'
    });

    var userOptions = this.options();
    userOptions = _.extend(options, userOptions);

    //console.log(userOptions);
    var isValidUrl = validUrl.isWebUri(userOptions.url);
    userOptions.baseUrl = userOptions.url;
    if(userOptions.testHome){
      userOptions.paths.push('');
    }
    if(userOptions.reporters.length < 1){
      userOptions.reporters.push(util.constants.reporters.console);
    }
    grunt.log.subhead('Processing reporters... ');
    grunt.log.writeln(util.constants.tabs.hyphens);

    //TODO: validate options
    if(isValidUrl){

      var generatedContent = {
        date: new Date().getTime(),
        task: this.target,
        results: []
      };

      var done = this.async();
      async.each(userOptions.paths,
        function(item, callback){
          userOptions.url = util.generateUrl(userOptions.baseUrl, item);
          runPageSpeedTests(userOptions, generatedContent, done, function(data){
            generatedContent = data;
            callback();
          });
        },
        function(err){
          // All tasks are done now
          grunt.log.subhead('Finished Processing reporters: ', userOptions.reporters.join().replace(/,/g, ', '));
          done();
        }
      );

    }
  });

};
