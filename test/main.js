var tap = require('tap');
var sc = require('stripcolorcodes');
var log = require('../index.js');

// Override the default date
var d = "2014-08-18T19:27:47.061Z";
Date.prototype.toISOString = function() { return d; };

tap.test('log a plain string', function(t) {
  console.log = function(str) {
    t.equal(sc(str), d + ':  INFO: hellothere');
    t.end();
  };

  log('hellothere');
});

tap.test('log an empty string', function(t) {
  console.log = function(str) {
    t.equal(sc(str), d + ':  INFO: ');
    t.end();
  };

  log('');
});

tap.test('log a WARN string', function(t) {
  console.log = function(str) {
    t.equal(sc(str), d + ':  WARN: mert');
    t.end();
  };

  log('warn','mert');
});

tap.test('log an ERROR string', function(t) {
  console.log = function(str) {
    t.equal(sc(str), d + ': ERROR: goodness gracious');
    t.end();
  };

  log('error','goodness gracious');
});

tap.test('log a FATAL string should die', function(t) {
  // Override error instead of log
  console.error = function(str) {
    t.equal(sc(str), d + ': FATAL: he dead');
  };

  // Override process.exit to end the test instead of
  // actually dying
  process.exit = function() {
    t.end();
  };

  log('fatal','he dead');
});

tap.test('log an object', function(t) {
  console.log = function(str) {
    t.equal(sc(str), d + ':  INFO: \n{ hi: \'there\' }');
    t.end();
  };

  log({ hi: 'there' });
});

tap.test('log an object with a message', function(t) {
  console.log = function(str) {
    t.equal(sc(str), d + ':  INFO: myObject\n{ hi: \'there\' }');
    t.end();
  };

  log({ hi: 'there' }, 'myObject');
});

tap.test('log an array', function(t) {
  console.log = function(str) {
    t.equal(sc(str), d + ':  INFO: \n[ 1, 2, 3 ]');
    t.end();
  };

  log([1,2,3]);
});

tap.test('log a WARN array', function(t) {
  console.log = function(str) {
    t.equal(sc(str), d + ':  WARN: \n[ 1, 2, 3 ]');
    t.end();
  };

  log('warn', [1,2,3]);
});

tap.test('log a WARN array with a message', function(t) {
  console.log = function(str) {
    t.equal(sc(str), d + ':  WARN: greer\n[ 1, 2, 3 ]');
    t.end();
  };

  log('warn', [1,2,3], 'greer');
});

tap.test('dont die with weird inputs', function(t) {
  console.log = function(str) {
    t.notOk(str, 'this should never be called');
  };

  t.notOk(log(undefined), 'single undefined');
  t.notOk(log(undefined, undefined), 'double undefined');
  t.notOk(log(undefined, undefined, undefined), 'tripple undefined');
  t.notOk(log(null), 'single undefined');
  t.notOk(log(null, null), 'double null');
  t.notOk(log(null, null, null), 'tripple null');
  t.notOk(log(undefined, ''), 'undefined then string');
  t.end();
});


