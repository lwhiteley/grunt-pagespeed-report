'use strict';

var grunt = require('grunt');
var _ = require('lodash');
var util = require('../../tasks/config/util/util');

exports.pagespeed_report = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  processThreshold_test_when_object_success: function(test) {
    test.expect(1);
    var threshold = {
      success: 80,
      warning: 60,
      marker: ''
    };
    var result = util.processThreshold(threshold, 90);
    test.equal(result.marker, 'success', 'marker should be set to success');

    test.done();
  },
  processThreshold_test_when_object_warning: function(test) {
    test.expect(1);
    var threshold = {
      success: 80,
      warning: 60,
      marker: ''
    };
    var result = util.processThreshold(threshold, 70);
    test.equal(result.marker, 'warning', 'marker should be set to warning');

    test.done();
  },
  processThreshold_test_when_object_danger: function(test) {
    test.expect(1);
    var threshold = {
      success: 80,
      warning: 60,
      marker: ''
    };
    var result = util.processThreshold(threshold, 50);
    test.equal(result.marker, 'danger', 'marker should be set to danger');

    test.done();
  },
  processThreshold_test_when_success_less_than_warning: function(test) {
    test.expect(2);
    var threshold = {
      success: 50,
      warning: 60,
      marker: ''
    };
    var result = util.processThreshold(threshold, 50);
    test.equal(result.success, 50, 'success should be set to 50');
    test.equal(result.warning, 40, 'warning should be set to 40');

    test.done();
  },
  processThreshold_test_when_success_is_zero: function(test) {
    test.expect(3);
    var threshold = {
      success: 0,
      warning: 60,
      marker: ''
    };
    var result = util.processThreshold(threshold, 50);
    test.equal(result.success, 0, 'success should be set to 0');
    test.equal(result.warning, 0, 'warning should be set to 0');
    test.equal(result.marker, '', 'marker should be set to empty string');

    test.done();
  },
  processThreshold_test_when_success_and_warning_are_not_numbers: function(test) {
    test.expect(2);
    var threshold = {
      success: null,
      warning: null,
      marker: ''
    };
    var result = util.processThreshold(threshold, 50);
    test.equal(result.success, 80, 'success should be set to 80');
    test.equal(result.warning, 60, 'warning should be set to 60');

    test.done();
  },
  processThreshold_test_when_number: function(test) {
    test.expect(3);
    var threshold = 90;
    var result = util.processThreshold(threshold, 50);
    test.equal(result.success, 90, 'success should be set to 90');
    test.equal(result.warning, 60, 'warning should be set to 60');
    test.equal(result.marker, 'danger', 'warning should be set to 40');

    test.done();
  }
};


/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/
