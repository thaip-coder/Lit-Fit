var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe.skip("GET /api/all", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all examples", function(done) {
    // Add some examples to the db to test with
    db.Example.bulkCreate([
      { text: "Book 1", 
      author: "First Description" },
      { text: "Book 2", 
      description: "Second Description" }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/all").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({ text: "Book 1", description: "First Description" });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({ text: "Book 2", description: "Second Description" });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});

