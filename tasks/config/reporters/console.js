'use strict';
var format = require("string-template"),
    _ = require('lodash'),
    grunt = require('grunt');

var util = require('../util/util');

module.exports = {
  console: function(data, options, generatedContent){

    //grunt.log.subhead(currentDir);
    grunt.log.writeln('Title:',    util.getTab(42), data.title);
    grunt.log.writeln('URL:',      util.getTab(40), data.id);

    if(data.score < data.threshold.success){
      grunt.log.error('Score:',    util.getTab(45), data.score);
    }else{
      grunt.log.writeln('Score:',  util.getTab(42), data.score);
    }

    grunt.log.writeln('Strategy:', util.getTab(45), options.strategy);

    grunt.log.subhead('Page Stats:');
    _.forOwn(data.pageStats, function(value, prop){
      var title = util.toSentence(prop);
      title = util.trimString(title);
      if(title.indexOf('Bytes') != -1){
        title = title.replace('Bytes', '');
        grunt.log.writeln(' ', title, util.getTab(title.length), util.roundToTwo(util.bytesToKb(value)), 'Kb');
      }else{
        grunt.log.writeln(' ', title, util.getTab(title.length), value);
      }
    });

    grunt.log.subhead('Rule Results:', util.getTab(15), '[Rule Impact]');
    _.forOwn(data.formattedResults.ruleResults, function(value, prop){
      var title = util.toSentence(prop); /*value.localizedRuleName*/
      title = util.trimString(title);
      grunt.log.writeln(' ', title, util.getTab(title.length), util.roundToTwo(value.ruleImpact));
    });

    grunt.log.subhead(util.constants.tabs.equals);
  }
};
