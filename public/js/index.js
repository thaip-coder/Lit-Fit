// accordian code

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

var name = getElementsByClassName("nameInp");

var readInp = getElementsByClassName("inputs");

readInp.createTextNode(name);

/* CODE FOR DISPLAYING STUFF BASED OFF OF API ROUTING, on click events post to our database API urls then use get requests to pull data and display it */

// function to display our user's books
function showBooks(){
  $.get("/api/books", function(data){
    
  })
}

// function to create a new user data and post it to the database
function newUser(event) {
  event.preventDefault();
  // store input fields into an object
  var user = {
    UserName: $("#nam").val(),
    password: $("#bok").val(),
    booksGoal: $("#mg").val()
  };
  // posts the user to the users table
  $.post("/api/users", user);
}
// calls newUser upon clicking of appropriate button
$("#nu").on("click", newUser());
// function to add a book
function newBook(event) {
  event.preventDefault();
  // store values in a variable
  var newBook = {
    title: $("").val(),
    author:$("").val(),
    pages:$("").val(),
    status:$("").val(),
    description:$("").val()
  }
  // may need app.post ?
  $.post("/api/books", function(req, res) {
    db.Books.create(newBook).then(function(dbBooks) {
      res.json(dbBooks);
    });
  }
}
// on click functionality
$("#nb").on("click", newBook(event));