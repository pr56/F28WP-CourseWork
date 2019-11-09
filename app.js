

var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/', function(req,res){
    res.sendFile(__dirname + '/Client/Index.html');
});
app.use('/Client', express.static(__dirname + '/Client'));

serv.listen(2000);