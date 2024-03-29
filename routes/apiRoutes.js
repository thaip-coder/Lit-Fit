var db = require("../models");

module.exports = function (app) {
  // Get all books
  app.get("/api/all", function (req, res) {
    db.Books.findAll({}).then(function (result) {
      res.json(result);
    });
  });
  // Get books within a specified status (complete or incomplete)
  /* app.get("/api/status/:status", function(req, res){
    db.Books.findAll({
      where: {
        status: req.params.status
      }
    }).then(function(result){
      res.json(result);
    });
  }); */
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
  // Add a new  book
  app.post("/api/all", function(req, res) {
    db.Books.create({
      title: req.body.title,
      author: req.body.author,
      totalPages: req.body.totalPages,
      status: req.body.status,
      pages: req.body.pages
    }).then(function(results){
      res.json(results);
    });
  });
  // Update a book
  app.put("/api/book/:id", function(req, res) {
    db.Books.update(
      {
          status: req.body.status,
          pages: req.body.pages
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
  /*app.delete("/api/:id", function (req, res) {
    db.Books.destroy({ where: { id: req.params.id } }).then(function (result) {
      res.json(result);
    });
  });*/
  // Get all users
  app.get("/api/users", function(req,res){
    db.Users.findAll({}).then(function(results){
      res.json(results);
    });
  });
  // Add user information
  app.post("/api/users", function(req, res){
    db.Users.create({
      UserName: req.body.UserName,
      password: req.body.password,
      booksGoal: req.body.booksGoal
    }).then(function(results){
      res.json(results);
    });
  });
  // Get user's information
  app.get("/api/users/:id", function(req, res){
    db.Users.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(results){
      res.json(results);
    });
  });
};
