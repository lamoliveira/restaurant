// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
//var PORT = 3000;
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Star Wars tables (DATA)
// =============================================================
var tables = 

[
  {
  customerName: "Ahmed",
  customerEmail: "afhaque89@gmail.com",
  customerID: "afhaque89",
  phoneNumber: "979-587-0887"
  },
  {
  customerName: "Graydon Scates",
  phoneNumber: "6789361811",
  customerEmail: "richard.scates@gmail.com",
  customerID: "Graydon1"
  },
  {
  customerName: "Graydon",
  phoneNumber: "",
  customerEmail: "",
  customerID: "Graydon1"
  },
  {
  customerName: "luiz",
  phoneNumber: "",
  customerEmail: "",
  customerID: "luiz"
  },
  {
  customerName: "Kevin Gonzalez",
  phoneNumber: "4074708223",
  customerEmail: "gkevin315@gmail.com",
  customerID: "gkevin315"
  }
];

var waitlist = 

[
  {
  customerName: "aaaaa",
  customerEmail: "aaaa@a.com",
  customerID: "aaaa",
  phoneNumber: "11117"
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "rest.html"));
});
app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

// Displays all tables
app.post("/api/clear", function(req, res) {
  console.log("clear");
  tables=[];
  waitlist=[];
//  res.sendFile(path.join(__dirname, "rest.html"));
});
/*
// Displays a single character, or returns false
app.get("/api/tables/:character", function(req, res) {
  var chosen = req.params.character;

  console.log(chosen);

  for (var i = 0; i < tables.length; i++) {
    if (chosen === tables[i].routeName) {
      return res.json(tables[i]);
    }
  }

  return res.json(false);
});*/

// Create New tables - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newtable = req.body;

  console.log(newtable);

  // We then add the json the user sent to the character array
  if (tables.length<5) {
  tables.push(newtable);
}
  else {
  waitlist.push(newtable);
  }
  // We then display the JSON to the users
  res.json(newtable);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App rest listening on PORT " + PORT);
});
