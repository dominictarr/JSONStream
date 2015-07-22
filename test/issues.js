var JSONStream = require('../');
var test = require('tape')

test('#66', function (t) {

    var stream = JSONStream
    .parse()
    .on('error', function (err) {
        t.ifError(err);
    })
    .on('end', function () {
        t.end();
    });

    stream.write('["foo":bar[');
    stream.end();

});