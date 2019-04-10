var express = require('express'),
  mysql = require('mysql'),
  credentials = require('./credentials.json'),
  app = express(),
  port = process.env.PORT || 1337;

//setup database credentials
credentials.host = 'ids.morris.umn.edu';

// setup the connection
var connection = mysql.createConnection(credentials);

// attempts to connect to database, returns
// error if not able to connect
connection.connect(function(err) {
  if (err) {
    console.log(error + " Hey you, I could not connect to the database.")
  }
});

// not sure what this is for
app.use(express.static(__dirname + '/public'));

// attempts to retrieve the buttons
// returns error if unable to
app.get("/buttons", function(req, res) {
  var sql = 'SELECT * FROM jafi.theButtons';
  connection.query(sql, (function(res) {
    return function(err, rows, fields) {
      if (err) {
        console.log("We have an error getting the buttons:");
        console.log(err);
      }
      res.send(rows);
    }
  })(res));
});

// attempts to retrieve data from the cart
// returns an error if unable to
app.get("/cart", function(req, res) {
  var sql = 'SELECT * FROM jafi.theCart';
  connection.query(sql, (function(res) {
    return function(err, rows, fields) {
      if (err) {
        console.log("We have an error getting the cart:");
        console.log(err);
      }
      res.send(rows);
    }
  })(res));
});


//THIS IS WHERE I LEFT OFF I WAS WORKING ON QUERYING FOR DIFFERENT
// ITEMS ON THE MENU
app.get("/click", function(req, res) {

  var hotdogCounter = 0;
  var burgerCounter = 0;
  var bananaCounter = 0;
  var milkdudCounter = 0;
  var id = req.param('id');
  var startTime = Date();

  switch (id) {
    case 1:
      if (hotdogCounter = 0) {
        hotdogCounter++;

        var sql = "INSERT INTO jafi.theCart from SELECT theInventory.itemID, " + hotdogCounter + ", ";

      }

  }


  if (id == 1) {
    var sql = "insert into jafi.cart values('hotdogs',5.99,'null')";
    console.log("Attempting sql ->" + sql + "<-");
  } else if (id == 2) {
    var sql = "insert into jafi.cart values('humburgers',4.19,'null')";
    console.log("Attempting sql ->" + sql + "<-");
  } else if (id == 3) {
    var sql = "insert into jafi.cart values('bannanas',1.00,'null')";
    console.log("Attempting sql ->" + sql + "<-");
  } else if (id == 4) {
    var sql = "insert into jafi.cart values('milkduds',1.50,'null')";
    console.log("Attempting sql ->" + sql + "<-");
  } else if (id == 5) {
    var sql = "truncate jafi.cart";
    console.log("Attempting sql ->" + sql + "<-");
  }



  connection.query(sql, (function(res) {
    return function(err, rows, fields) {
      if (err) {
        console.log("We have an insertion error:");
        console.log(err);
      }
      res.send(err); // Let the upstream guy know how it went
    }
  })(res));
});

app.get("/delete", function(req, res) {
  var id = req.param('id');

  var sql = "delete from jafi.cart where item_id=" + id;
  console.log("Attempting sql ->" + sql + "<-");

  connection.query(sql, (function(res) {
    return function(err, rows, fields) {
      if (err) {
        console.log("We have an deletion error:");
        console.log(err);
      }
      res.send(err); // Let the upstream guy know how it went
    }
  })(res));
});

app.get("/total", function(req, res) {
  var sql = "select sum(price) from jafi.cart;"
  console.log("Attempting sql ->" + sql + "<-");

  connection.query(sql, (function(res) {
    return function(err, rows, fields) {
      if (err) {
        console.log("Total error:");
        console.log(err);
      }
      res.send(rows); // Let the upstream guy know how it went
    }
  })(res));
});

// Your other API handlers go here!

app.listen(port);