/*
use myPlayers
db.createCollection("account");
db.createCollection("scores");
*/

var mongojs = require("mongojs");
var db = mongojs('46.101.126.219:27017/myPlayers', ['account', 'scores']);

var express = require('express');
var app = express();
var serv = require('http').Server(app);


app.get('/', function(req,res){
    res.sendFile(__dirname + '/Client/Index.html');
});

app.use('/Client', express.static(__dirname + '/Client'));

serv.listen(process.env.PORT || 2020);
console.log("Server started on port 2020.");

var isValidPassword = function(data,cb){
    db.account.find({username:data.username,password:data.password},function(err,res){
        if(res.length > 0)
            cb(true);
        else
            cb(false);
    });
}

var isUsernameTaken = function(data,cb){
    db.account.find({username:data.username},function(err,res){
        if(res.length > 0)
            cb(true);
        else
            cb(false);
    });
}

var addUser = function(data,cb){
    db.account.insert({username:data.username,password:data.password},function(err){
        cb();
    });
}

var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
 console.log('socket connection');
 socket.on('user', function(data){
     console.log('user ID' + data.reason);
 });

 socket.on('signIn',function(data){
    isValidPassword(data,function(res){
        if(res){
            socket.emit('signInResponse',{success:true});
        } else {
            socket.emit('signInResponse',{success:false});         
        }
    });
});



socket.on('signUp',function(data){
    isUsernameTaken(data,function(res){
        if(res){
        socket.emit('signUpResponse', {success: false});
    }else{
        addUser(data,function(){
            socket.emit('signUpResponse',{success:true}); 
    }); 
   } 
 });

});

});
