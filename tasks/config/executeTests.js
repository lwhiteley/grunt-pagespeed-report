var validUrl = require('valid-url'),
    google = require('googleapis'),
    pagespeedonline = google.pagespeedonline('v1'),
    uuid = require('node-uuid'),
    grunt = require('grunt');


var jsoni = require('jsoni');
var reporters = require('./reporters'),
    util = require('./util/util');

var runPageSpeedTests = function(userOptions, done){
  var generatedContent = {
    date: new Date().getTime(),
    results: []
  };
  for(var x = 0; x< userOptions.paths.length; x++){
       userOptions.url = util.generateUrl(userOptions.baseUrl, userOptions.paths[x]);
       pagespeedonline.pagespeedapi.runpagespeed(userOptions, function(error, req){
         if(error){
           return done(false);
         }
         req.uuid = uuid.v1();
         req.threshold = util.processThreshold(userOptions.threshold, req.score);
         req.thresholdMarker = req.threshold.marker;
         generatedContent.results.push(req);

         userOptions.reporters.forEach(function(reporter){
           if(reporters.hasOwnProperty(reporter)){
             reporters[reporter](req, userOptions, generatedContent, done);
           }
         });

         //grunt.file.write('tmp/output.json', jsoni.stringify(generatedContent));

         //tell grunt the tasks are finished
         if(x === userOptions.paths.length - 1) done();
     });

   }
};
module.exports = runPageSpeedTests;
