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

var name = document.getElementsByClassName("nameInp");

var readInp = document.getElementsByClassName("inputs");

//readInp.createTextNode(name);

/* CODE FOR DISPLAYING STUFF BASED OFF OF API ROUTING, on click events post to our database API urls then use get requests to pull data and display it */
// declare books as an empty array, this will be updated every time the showBooks function is called and iterated to display in our HTML
var books = [];

// function to display our user's books
function showBooks(){
  $.get("/api/all", function(data){
    books = data;
    // call function to display rows/display rows?
    // ID OF TABLE CONTAINER TBD
    //$("#table").empty();
    // loop over books object array to populate table
    for (let i=0; i < books.length; i++) {
      let bookStat;
      if (books[i].status) { bookStat = "In Progress" } else { bookStat = "Complete" }
      $("#table").append(`<tr><td>${books[i].title}</td><td>${books[i].author}</td><td> ${books[i].pages} / ${books[i].totalPages}</td><td><button class="status" data-bookid="${books[i].id}">${bookStat}</button></td></tr>`)
    }
  })
}
// on click event for add book button
//$("#nb").on("click", showBooks);
showBooks();
$(document).on("click", "button.status",updateStatus);

// function to edit books table / update database
function updateStatus(event){
  //event.preventDefault();
  let id = $(this).data("bookid");
  // to do logic to boolean book status
  book[id].status = false;
  let newstatus = {
    status: book[id].status,
    progress: book[id].pages
  }
  $.put("/api/book/"+id, function(req, res){
    /*
    db.Books.update({
      {
        status: bookStat
      },
      where: {
        id: req.params.id
      }
    })*/
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
$("#nu").on("click", newUser);
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
  });
}
// on click functionality
$("#nb").on("click", newBook);