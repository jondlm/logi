"use strict";

var util = require('util');
var clc = require('cli-color');

// Colors
var colors = {
  INFO: clc.blue,
  WARN: clc.yellow,
  ERROR: clc.red,
  FATAL: clc.bgRed.white.bold
};


//
// Export
// -------------------------------------
// `thing` could be a string, object, or an array
// `optionalMessage` is needed if `thing` is not a string
module.exports = function(level, thing, optionalMessage) {
  var now = new Date().toISOString(); // 2014-08-18T19:11:56.506Z

  // one argument, a string
  //   log('important message')
  if (arguments.length === 1 && isString(level)) {
    thing = level;
    level = 'INFO';
  }

  // one argument, an object or array
  //   log(myObject)
  if (arguments.length === 1 && isObjectOrArray(level)) {
    thing = level;
    level = 'INFO';
  }

  // two arguments, 1 is object or array and 2 is a string
  //   log({one:1}, 'check out my object')
  if (isObjectOrArray(level) && isString(thing)) {
    optionalMessage = thing;
    thing = level;
    level = 'INFO';
  }

  // if thing is an object or an array, util.inspect it
  if (isObjectOrArray(thing)) {
    thing = util.inspect(thing, { colors: true, depth: 5 });
    thing = (optionalMessage || '') + '\n' + thing;
  }

  level = level.toUpperCase();

  if (level === 'FATAL') {
    console.error(
      colors['INFO'](now) + ": " +
      colors[level](level) + ": " +
      thing
    );
    return process.exit(1); // die in a fire!
  }

  console.log(
    colors['INFO'](now) + ": " +
    colors[level](prepad(level, 5)) + ": " +
    thing
  );

};

//
// Helpers
// -------------------------------------

// Pre-pads the `string` with spaces based on `length`
function prepad(string, length) {
  if (string.length < length) {
    for (var i = 0; i < length - string.length; i++) {
      string = ' ' + string;
    }
    return string;
  } else {
    return string;
  }
}

function isObjectOrArray(x) {
  var type = Object.prototype.toString.call(x);
  return type === '[object Object]' || type === '[object Array]';
}

function isString(x) {
  return typeof x === 'string';
}
