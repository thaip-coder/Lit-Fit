require("dotenv").config();
var express = require("express");
var path = require("path");
var Sequelize = require("sequelize");
var mysql = require("mysql");

// =================================================================
// Added for Passport
/*
var routes = require("./routes");
var user = require("./routes/user");
var http = require("http");
var passport = require("passport");
var passportConfig = require("./config/passport");
var home = require("./routes/home");
var application = require("./routes/application");

app.use("/public", express.static(__dirname+"/public"));
*/
// ==================================================================
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Static directory to be served
app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "production") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
