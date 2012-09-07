var fs = require ('fs');
var net = require('net');
var join = require('path').join;
var file = join(__dirname, 'fixtures','all_npm.json');
var it = require('it-is');
var JSONStream = require('../');

var str = fs.readFileSync(file);
var expected = JSON.parse(str);

var server = net.createServer(function(client) {
    var root_calls = 0;
    var data_calls = 0;
    var parser = JSONStream.parse();
    parser.on('root', function(root, count) {
        ++ root_calls;
    });

    parser.on('data', function(data) {
        ++ data_calls;
        it(data).deepEqual(expected)
    });

    parser.on('end', function() {
        console.error('END');
        it(root_calls).equal(3);
        it(data_calls).equal(3);
        server.close();
    });
    client.pipe(parser);
});
server.listen(9999);

var client = net.connect({ port : 9999 }, function() {
    var msgs = [str, str, str].join('');
    client.end(msgs);
});
