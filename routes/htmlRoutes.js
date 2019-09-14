var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Books.findAll({}).then(function(dbBooks) {
      res.render("index", {
        msg: "Welcome!",
        books: dbBooks
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
