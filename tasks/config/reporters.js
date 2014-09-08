'use strict';
var  _ = require('lodash');

var reporters = {};
reporters = _.extend(reporters, require('./reporters/console'));
reporters = _.extend(reporters, require('./reporters/html'));
module.exports = reporters;
