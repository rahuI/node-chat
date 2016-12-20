var express = require('express');
var app = express();
var userList = [];
var bodyParser = require('body-parser');
var path = require('path');
app.use(express.static(path.resolve(__dirname + '/../client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
  }));
var total = 0;
var users = [];

var messageTo = {
}
var isMessageTo = {
}
app.get('/getonlineusers',function(req,res){
  res.json({
    success : true,
    data : users
  });
});
app.post('/setpublicmessage',function(req,res){
  //need body.id,from,message
  for(var i=0; i<users.length; i++){
    messageTo[users[i].id] = {
        "from" : req.body.id,
        "message" : req.body.msg,
        "name" : req.body.name
    };
    isMessageTo[users[i].id] = true;
  }
  res.json({
    status : true
  });
});
app.post('/online',function(req,res){
  console.log(total);
  total++;
  users.push({
      id : "xx"+total,
      name : req.body.name
  });
  res.json({
      status : true,
      data : {
        id : "xx"+total,
        name : req.body.name
      }
  });
});
app.post('/getpublicmessage',function(req,res){
  //body.id
  if(isMessageTo[req.body.id]){
    res.json({
          msg : messageTo[req.body.id].message,
          from : messageTo[req.body.id].from,
          name : messageTo[req.body.id].name,
          status : true
    });
    isMessageTo[req.body.id] = false;
  }else{
    res.json({
      status : false
    });
  }
});

app.all('/*', function(req, res) {
     res.end(path.resolve(__dirname + "/../client/index.html"));
});

app.listen(3000,function(){
	console.log("hell yeah! server started on port : " + 3000);
});
