# Logi

I wrote this logger to be simple to use and **not** feature rich. I needed
something straightforward that doesn't require much thought when logging in
node. Besides having a simple api, it colors the console output for
readability.

## Logging levels

There are four levels of logging that can be input, 'info', 'warn', 'error',
and 'fatal' with corresponding levels of severity. 'fatal' will cause your
program to exit.

## Example

    var log = require('logi');

    log('some text');
    log('info', 'info fo yo friends');
    log('warn', 'word of warning to your mother');
    log('error', 'some error text as an ERROR, wont kill your program');
    log(myObject);
    log(myArray);
    log(myObject, 'hey everyone, come checkout my object as INFO!');

You can throw pretty much anything at *logi* and it will log it. The first
argument can optionally be one of the logging levels.

## Tests

Make sure you `npm install`, then run `npm test`.

