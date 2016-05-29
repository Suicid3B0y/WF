var PORT = 5000;
if (process.argv[2]) {
    PORT = process.argv[2];
}

var main = require('express')();
var http = require('http');
var sugar = require('sugar');
var bodyParser = require('body-parser');
main.use(bodyParser.urlencoded({ extended: true }));
var server = http.createServer(main)
var io = require('socket.io').listen(server);
var fs = require('fs');
var uuid = require('node-uuid');

var options = {
    root: __dirname + '/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
};

main.get('/', function(req, res) {
    res.sendFile('views/index.html', options);
});

server.listen(PORT, null, function() {
    console.log("Listening on port " + PORT);
});

io.sockets.on('connection', function(socket) {
	console.log('user connected');
});
