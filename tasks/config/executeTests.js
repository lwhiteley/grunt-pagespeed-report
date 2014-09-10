var validUrl = require('valid-url'),
    google = require('googleapis'),
    pagespeedonline = google.pagespeedonline('v1'),
    uuid = require('node-uuid'),
    grunt = require('grunt');



var reporters = require('./reporters'),
    util = require('./util/util');

var runPageSpeedTests = function(userOptions, generatedContent, done, callback){

  pagespeedonline.pagespeedapi.runpagespeed(userOptions, function(error, req){
       if(error){
         grunt.log.error('Cannot proceed, fatal error occurred');
         grunt.fail.fatal(error);
       }
       req.uuid = uuid.v1();
       req.threshold = util.processThreshold(userOptions.threshold, req.score);
       req.thresholdMarker = req.threshold.marker;
       generatedContent.results.push(req);
       userOptions.reporters.sort();
       userOptions.reporters.forEach(function(reporter){
         if(reporters.hasOwnProperty(reporter)){
           reporters[reporter](req, userOptions, generatedContent, callback);
         }else{
           grunt.log.warn('Warning: \''+reporter+'\' is not a known reporter. Cannot Process');
         }
       });

      //callback(generatedContent);
   });

   //}
};
module.exports = runPageSpeedTests;
