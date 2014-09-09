'use strict';
var format = require("string-template"),
    _ = require('lodash'),
    validUrl = require('valid-url'),
    google = require('googleapis'),
    pagespeedonline = google.pagespeedonline('v1'),
    uuid = require('node-uuid'),
    grunt = require('grunt');



var constants = {
  output: '.reports',
  tabs: {
    spaces:  '                                                 ',
    hyphens:'-----------------------------------------------------------------------',
    equals: '======================================================================='
  },
  patterns: {
    findSpaces: '(([ ]){1,{number}})'

  },
  reporters: {
    console: 'console',
    html: 'html',
    json: 'json'
  },
  markers:{
    danger: 'danger',
    success: 'success',
    warning: 'warning'
  }
};

var getTab = function(amountToRemove){
  var pattern = format(constants.patterns.findSpaces, {number: amountToRemove});
  var regPattern = new RegExp(pattern);
  var result = constants.tabs.spaces.replace(regPattern, '');
  return result;
};

var roundToTwo = function(num){
  var result = Math.round(num * 100) / 100;
  return result;
};

var toSentence = function(text){
  var result = text.replace( /([A-Z])/g, " $1" );
  var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

var bytesToKb = function(num){
  var result = num * 0.001;
  return result;
};

 /**
 * Trims whitespace at the beginning and/or end of a string
 * @param value - string to be trimmed
 * @returns {String} - returns an empty string if the value passed is not of type {String}
 */
var trimString = function (value) {
    if (_.isString(value)) {
        return value.replace(/^\s*/, '').replace(/\s*$/, '');
    }
    return '';
};

var generateUrl = function(baseUrl, path){
  if(_.isString(path) && _.isString(baseUrl) && validUrl.isWebUri(baseUrl)){
    var result = baseUrl+path;
    return result;
  }else{
    return '';
  }
};

var setMarker = function(threshold, score){
  if(threshold.success > 0){
    if(score >= threshold.success){
      threshold.marker = constants.markers.success;
    }else if(score >= threshold.warning){
      threshold.marker = constants.markers.warning;
    }else{
      threshold.marker = constants.markers.danger;
    }
  }
  return threshold;
};

var normalizeThreshold = function(threshold){
  if(!_.isNumber(threshold.success)){
    threshold.success = 80;
  }
  if(!_.isNumber(threshold.warning)){
    threshold.warning = 60;
  }

  if(threshold.success <= threshold.warning){
    threshold.warning = threshold.success - 10;
  }
  if(threshold.success <= 0){
    threshold.success = 0;
    threshold.warning = 0;
  }
  return threshold;
};

var processThreshold = function(value, score){
  var threshold = {
    success: 80,
    warning: 60,
    marker: ''
  };

  if(_.isObject(value)){
    threshold = _.extend(threshold, value);
  }else if(_.isNumber(value)){
    threshold.success = value;
  }
  threshold = normalizeThreshold(threshold);
  threshold = setMarker(threshold, score);
  return threshold;
};


module.exports = {
  constants: constants,
  getTab: getTab,
  roundToTwo: roundToTwo,
  toSentence: toSentence,
  bytesToKb: bytesToKb,
  trimString: trimString,
  generateUrl: generateUrl,
  processThreshold: processThreshold
};
