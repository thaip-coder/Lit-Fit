var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // blog route loads blog.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
