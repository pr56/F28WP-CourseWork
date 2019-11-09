

var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/', function(req,res){
    res.sendFile(__dirname + '/Client/Index.html');
});
app.use('/Client', express.static(__dirname + '/Client'));

serv.listen(2000);
console.log("Server started.");

var io = require('socket.io')(serv,{});
io.sockets.on('connection',function(socket){
    
console.log('socket connection');
    
socket.on('test',function(){
    console.log('test');
    
    
});
});
