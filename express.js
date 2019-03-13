var express=require('express'),
mysql=require('mysql'),
credentials=require('./credentials.json'),
app = express(),
port = process.env.PORT || 1337;

credentials.host='ids.morris.umn.edu'; //setup database credentials

var connection = mysql.createConnection(credentials); // setup the connection

connection.connect(function(err){if(err){console.log(error)}});

app.use(express.static(__dirname + '/public'));
app.get("/buttons",function(req,res){
  var sql = 'SELECT * FROM jafi.till_buttons';
  connection.query(sql,(function(res){return function(err,rows,fields){
     if(err){console.log("We have an error:");
             console.log(err);}
     res.send(rows);
  }})(res));
});
app.get("/cart",function(req,res){
  var sql = 'SELECT * FROM jafi.cart';
  connection.query(sql,(function(res){return function(err,rows,fields){
     if(err){console.log("We have an error:");
             console.log(err);}
     res.send(rows);
  }})(res));
});
app.get("/click",function(req,res){
  var id = req.param('id');
  if(id==1){
    var sql = "insert into jafi.cart values('hotdogs',5.99,'null')";
    console.log("Attempting sql ->"+sql+"<-");
  }else if(id==2){
    var sql = "insert into jafi.cart values('humburgers',4.19,'null')";
    console.log("Attempting sql ->"+sql+"<-");
  }else if(id==3){
    var sql = "insert into jafi.cart values('bannanas',1.00,'null')";
    console.log("Attempting sql ->"+sql+"<-");
  }
  else if(id==4){
    var sql = "insert into jafi.cart values('milkduds',1.50,'null')";
    console.log("Attempting sql ->"+sql+"<-");
  }
  else if(id==5){
    var sql = "truncate jafi.cart";
    console.log("Attempting sql ->"+sql+"<-");
  }

  connection.query(sql,(function(res){return function(err,rows,fields){
     if(err){console.log("We have an insertion error:");
             console.log(err);}
     res.send(err); // Let the upstream guy know how it went
  }})(res));
});

app.get("/delete",function(req,res){
  var id = req.param('id');

  var sql = "delete from jafi.cart where item_id=" + id;
  console.log("Attempting sql ->"+sql+"<-");

  connection.query(sql,(function(res){return function(err,rows,fields){
     if(err){console.log("We have an deletion error:");
             console.log(err);}
     res.send(err); // Let the upstream guy know how it went
  }})(res));
});

// Your other API handlers go here!

app.listen(port);
