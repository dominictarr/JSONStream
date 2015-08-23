var JSONStream = require('../');
var test = require('tape')

test('#66', function (t) {
  var passed = false;
   var stream = JSONStream
    .parse()
    .on('error', function (err) {
        t.ok(err);
        passed = true;
    })
    .on('end', function () {
        t.ok(passed);
        t.end();
    });

    stream.write('["foo":bar[');
    stream.end();

});
