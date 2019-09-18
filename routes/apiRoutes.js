var db = require("../models");

module.exports = function(app) {
  // Get all books
  app.get("/api/all", function(req, res) {
    db.Books.findAll({}).then(function(result) {
      res.json(result);
    });
  });
  // Get books within a specified category
  app.get("/api/cat/:category", function(req, res){
    db.Books.findAll({
      where: {
        category: req.params.category
      }
    }).then(function(result){
      res.json(result);
    });
  });
  // get all books by a particular author
  app.get("/api/author/:author", function(req, res){
    // refine logic to match parameter input with data
    db.Books.findAll({
      where: {
        author: req.params.author
      }
    }).then(function(result){
      res.json(result);
    });
  });
  // find a single book by one id
  app.get("/api/id/:id", function(req, res){
    db.Books.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(result){
      res.json(result);
    });
  });

  // Update a book
  app.put("/api/book/:id", function(req, res) {
    db.Books.update(
      {
          status: req.body.status,
          pages: req.body.progress
      }, 
      {
        where: {
          id: req.params.id
        }
      }
      ).then(function(dbBooks) {
      res.json(dbBooks);
    });
  });

  // Delete a book by id
  app.delete("/api/:id", function(req, res) {
    db.Books.destroy({ where: { id: req.params.id } }).then(function(result) {
      res.json(result);
    });
  });
  // Delete a book by title
  app.delete("/api/:title", function(req, res) {
    // refine logic to better match params and title
    db.Books.destroy({ where: { title: req.params.title } }).then(function(result) {
      res.json(result);
    });
  });
};
