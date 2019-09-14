var db = require("../models");

module.exports = function(app) {
  // Get all books
  app.get("/api/all", function(req, res) {
    db.Books.findAll({}).then(function(result) {
      res.json(result);
    });
  });
  // Get books within a specified category
  app.get("/api/:category", function(req, res){
    db.Books.findAll({
      where: {
        category: req.params.category
      }
    }).then(function(result){
      res.json(result)
    });
  });

  // Create a new example
  app.post("/api/books", function(req, res) {
    db.Books.create(req.body).then(function(dbBooks) {
      res.json(dbBooks);
    });
  });

  // Delete a book by id
  app.delete("/api/:id", function(req, res) {
    db.Books.destroy({ where: { id: req.params.id } }).then(function(result) {
      res.json(result);
    });
  });
};
