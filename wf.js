var PORT = 5000;
if (process.argv[2]) {
    PORT = process.argv[2];
}

var main = require('express')();
var http = require('http');
var sugar = require('sugar');
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

var sockets = [];

var gameStarted = false;

function toggleType(type) {
    return (type=="begin") ? "end" : "begin";
}

io.sockets.on('connection', function(socket) {
    sockets.add(socket);
    if (!gameStarted && sockets.length>=2) {
        gameStarted=true;
        sockets[0].emit('begin', {letters: "cat"});
        sockets[0].type = "begin";
        sockets[0].letters = "cat";
    }

    socket.on('word', function(data)) {
        console.log(data);
    }

    socket.uuid = uuid.v4();
    console.log('user connected');

    socket.on('word') {

    }
});
