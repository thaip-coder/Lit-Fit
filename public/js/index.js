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
      let bookStat = "";
      if (books[i].status) { bookStat = "In Progress" } else { bookStat = "Complete" }
      $("#table").append(`<tr><td>${books[i].title}</td><td>${books[i].author}</td><td> <span id="span${books[i].id}" data-pageid="${books[i].id}" contenteditable="true">${books[i].pages}</span> / ${books[i].totalPages} </td><td><select id="select${books[i].id}" name="Status">
      <option value="inprogress">In Progress</option>
      <option value="complete">Complete</option></select>
    </select></td><td><button class="update" data-updateid="${books[i].id}">Update</button></td></tr>`)
    }
  })
}
// on click event for add book button
//$("#nb").on("click", showBooks);
showBooks();

// declare progress?
/*var progress
// edit button functionality
function toggleEdit () {
  if ($("span.pageprog").is(":focus")) {
    //$(this).removeClass("inactive");
    //$(this).addClass("active");
    console.log("this is active")
    let id = $(this).data("pageid");
    progress = {
      progress: $("#span"+id).val()
    } 
  } 
}*/

// function to edit books table / update database / update button
function updateStatus(event){


  event.preventDefault();
  let id = $(this).data("updateid");
  console.log(id)
  console.log("Row updated!")

  // update the object in the object array of books with the values from the row somehow
  let spanid = "span"+id
  console.log($("#"+spanid).text());
  let selectid = "select"+id;
  let statusSelect = $("#"+selectid).val();
  if (statusSelect === "inprogress" ) {
    books[id].status = true;
  } else {
    books[id].status = false;
  }
  books[id].pages = parseInt($("#"+spanid).text());

  let newstatus = {
    status: books[id].status,
    pages: books[id].pages
  }
  // posts the edits to the table
  $.put("/api/book/"+id, newstatus)
}
// on click for the update status function
$(document).on("click", "button.update",updateStatus)

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
$(document).on("click", "button.nb", newUser);
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