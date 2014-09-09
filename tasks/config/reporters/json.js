'use strict';
var jsoni = require('jsoni'),
    grunt = require('grunt');

var util = require('../util/util');

module.exports = {
  json: function(data, options, generatedContent){
    //console.log();
    grunt.file.write(util.constants.output + '/json/' + generatedContent.task + '.json', jsoni.stringify(generatedContent));
  }
};

//
