'use strict';
var _ = require('lodash'),
    jsonFormat = require('json-format'),
    grunt = require('grunt');

var util = require('../util/util');

module.exports = {
  json: function(data, options, generatedContent, callback){
    if(_.isString(options.dest)){
      grunt.file.write(options.dest + '/json/' + generatedContent.task + '.json', jsonFormat(generatedContent));
      grunt.file.write(options.dest + '/json/content/' + data.uuid + '.json', jsonFormat(data));
    }
    callback(generatedContent);
  }
};

//
