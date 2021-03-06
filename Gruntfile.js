/*
 * grunt-pagespeed-report
 * https://github.com/lwhiteley/grunt-pagespeed-report
 *
 * Copyright (c) 2014 Layton Whiteley
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        //'<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp', '.reports']
    },

    // Configuration to be run (and then tested).
    pagespeed_report: {
      options:{
        key: 'AIzaSyD942uqcWhVA1c7D2fgusgMff6fOq2wRK8',
        paths: ['/updates', '/resources'],
        locale: 'en_US',     // optional
        strategy: 'desktop',  // optional
        threshold: 80        // optional
      },
      prod: {
        options: {
          reporters: ['html', 'json', 'console'],
          dest:'.reports/prod',
          url: 'http://html5rocks.com/en',
          locale: 'en_US',     // optional
          strategy: 'desktop',  // optional
          threshold: 80        // optional
        }
      },
      test: {
        options: {
          reporters: ['json','console'],
          key: 'AIzaSyD942uqcWhVA1c7D2fgusgMff6fOq2wRK8',
          url: 'http://html5rocks.com/en',
          paths: ['/updates'],
          testHome: false,
          dest:'.reports/test'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      e2e: ['test/e2e/**/*.test.js'],
      unit: ['test/unit/**/*.test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test:e2e', ['clean', 'pagespeed_report', 'nodeunit:e2e']);
  grunt.registerTask('test:unit', ['nodeunit:unit']);
  grunt.registerTask('test', ['clean', 'pagespeed_report', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
