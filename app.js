
var express = require('express');
var mysql =require("mysql");
var bodyParser = require('body-parser');
var app = express();
var serv = require('http').Server(app);

app.use('/Client', express.static(__dirname + '/Client'));

app.use(bodyParser.urlencoded({extended: false}))
app.set('view engin')
app.get('/', function(req,res){
    //res.sendFile(__dirname + '/Client/Index.html');
    res.sendFile('/Client/Index.html',
    { root: __dirname }) // Here we invoke the game 
});
var connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'scoreboard'
    });

    connection.connect(function(err){
        if (err) {throw err;}

        console.log('Connected...');
    })

    app.post('/submit', function (req,res) {
        console.log("helloo");
         console.log(req.body.name);
         //console.log(req.body)
    
         var sql = "insert into scores values("+ "'"+ req.body.name +"', '"+ req.body.password + "' )"
         connection.query(sql,function (err){
             if (err) throw err
           res.sendFile('Client/JS/game.js',{ root: __dirname }) // HERE U have to think how u would invoke the game 
           connection.end();
        });

//   My Codes
//  app.post('/submit', function (req,res) {
//     console.log("helloo");
//      console.log(req.body.name);
//      //console.log(req.body)

//      var sql = "insert into scores values("+ req.body.name +"', '"+ req.body.password +"')"
//      connection.query(sql,function (err){
//          if (err) throw err
//         //  res.render('index',{tittle: 'Data Saved',
//         //  message: 'Data Saved successfully.'
//         })
//         res.sendFile(start_Game());
    
//          connection.end();
//      })
     
    /* name=req.body.name;

     sql = "insert into t (name,pass) values" + 
     console.log(sql );
     res.sendFile()
    
    message: 'Data Saved successfully.'}) */
});


serv.listen(2000);
console.log("Server started on port 3000.");

var io = require('socket.io')(serv,{});
io.sockets.on('connection',function(socket){
    
console.log('socket connection');
    
socket.on('test',function(){
    console.log('test');
    
    
});
});
