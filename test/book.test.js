var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/all", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all books", function(done) {
    // Filler books for the db to test with
    db.Books.bulkCreate([
      {
        title: "Murder on the Orient Express",
        author: "First Description",
        pages: 184,
        status: "Complete"
      },
      {
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J. K. Rowling",
        pages: 330,
        status: "Complete"
      }
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
          .that.includes({
            id: 1,
            title: "Murder on the Orient Express",
            author: "First Description",
            pages: 184,
            status: "Complete"
          });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({
            id: 2,
            title: "Harry Potter and the Sorcerer's Stone",
            author: "J. K. Rowling",
            pages: 330,
            status: "Complete"
          });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
