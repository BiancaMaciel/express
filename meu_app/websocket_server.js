var io = require('socket.io')(http);
var app = require('express')();
var http = require('http').Server(app);
var port = 3001;

io.on('connection', function(socket){
  socket.on('sendPosition', function(positions){
    io.emit('setPosition', positions);
  });
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/tela.html');
});

app.get('/controle', function(req, res){
  res.sendFile(__dirname + '/controle.html');
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
