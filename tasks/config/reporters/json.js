'use strict';
var jsoni = require('jsoni'),
    _ = require('lodash'),
    grunt = require('grunt');

var util = require('../util/util');

module.exports = {
  json: function(data, options, generatedContent, callback){
    if(_.isString(options.dest)){
      grunt.file.write(options.dest + '/json/' + generatedContent.task + '.json', jsoni.stringify(generatedContent));

    }
    callback(generatedContent);
  }
};

//
