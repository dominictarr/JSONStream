

var stream = require ('stream');
var JSONStream = require('../');
var it = require('it-is');

var parser = JSONStream.parse('*')
  , called = 0
  , ended = false
  , error = false
  , parsed = [];
  
var s = new stream.Readable();
s._read = function noop() {};
s.push('["foo":bar[');
s.push(null);

parser.on('data', function (data) {
  called++;
});

parser.on('end', function () {
  ended = true;
});

parser.on('error', function () {
  error = true;
});

s.pipe(parser);

process.on('exit', function () {
  it(ended).equal(true);
  it(error).equal(true);
  it(called).equal(0);
  console.error('PASSED');
})