var jsdom = require('jsdom'),
    shelljs = require('shelljs'),
    format = require("string-template"),
    grunt = require('grunt');
var moment = require('moment');
var util = require('../util/util');
// TODO: make files in tmp dir and then move to path relativ to current working directory
module.exports = {
  html: function(data, options, generatedContent){
    grunt.log.subhead('Processing html for: ', data.id);
    grunt.log.subhead(util.constants.tabs.equals);
    var dateString = moment().format("MMMM Do YYYY, h:mm:ss A zz");
    var currentDir = __dirname +'/' ;
    //grunt.file.copy(currentDir+ '../template/html', '.reports');
    var indexPath = currentDir +'template/html/index.html';
    var html = grunt.file.read(indexPath);
    //console.log(shelljs.pwd());
    //var window = jsdom.jsdom().parentWindow;
    /* parse the html and create a dom window */
    var _jsdom = require('jsdom').jsdom(html, null, {
            // standard options:  disable loading other assets
            // or executing script tags
            FetchExternalResources: false,
            ProcessExternalResources: false,
            MutationEvents: false,
            QuerySelector: false
    });

    var window = _jsdom.parentWindow;
    jsdom.jQueryify(window, 'http://code.jquery.com/jquery-2.1.1.js', function () {
      window.$('#template-doc-title').text(options.title);
      window.$('.template-overview-table-elm').remove();

      window.$('#template-date').text(dateString);

      generatedContent.results.forEach(function(result){
        var rowTemplate = '<tr class="template-overview-table-elm {thresholdMarker}"><td><a href="#">{id}</a></td><td>{score}</td></tr>';
        var row = format(rowTemplate, result);
        window.$('#template-overview-table-body').append(row);


      });
      window.$('.jsdom').remove();
      var indexFile = window.document.documentElement.outerHTML;
      grunt.file.write(indexPath, indexFile);

    });
  }
};
