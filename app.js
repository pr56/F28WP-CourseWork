

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

const mysql = require('mysql');
const connection = mysql.createConnection(
{
  host: 'localhost',
  user: 'root',
  password: ''
});

connection.connect(function(err)
{
    if (!err) 
    console.log("connection successful");
    connection.query("CREATE DATABASE scores", function (err) 
    {
        if(!err)
        {
             
        console.log("Database Created");
        }
    });
    
    connection.query("USE scoreboard", function(err)
    {
        if(!err)
        {
            console.log("using scoreboard");
        }

    });

    let table = "CREATE TABLE scores(name VARCHAR(100) , password VARCHAR(100), retype VARCHAR(100), score INT(100))";
    connection.query(table , function (err)
    {
        if(!err)
        {
            console.log("table done");
        }
    });


});