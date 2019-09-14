var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // blog route loads blog.html
  app.get("/", function(req, res) {
<<<<<<< HEAD
    res.sendFile(path.join(__dirname, "../public/index.html"));
=======
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
>>>>>>> 3fa54973bdfc4aea542a82ec89bcc316c450b326
  });
};
