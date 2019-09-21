// assure nothing starts until HTML document/page load
$(document).ready(function(){
/* CODE FOR DISPLAYING STUFF BASED OFF OF API ROUTING, on click events post to our database API urls then use get requests to pull data and display it */
// declare books as an empty array, this will be updated every time the showBooks function is called and iterated to display in our HTML
var books = [];

// function to display our user's books
function showBooks(){
  $.get("/api/all", function(data){
    books = data;
    // call function to display rows/display rows?
    // loop over books object array to populate table
    for (let i = 0; i < books.length; i++) {
      let bookStat = "";
      if (books[i].status) { bookStat = "In Progress" } else { bookStat = "Complete" }
      $("#table").append(`<tr><td>${books[i].title}</td><td>${books[i].author}</td><td> <span id="span${books[i].id}" data-pageid="${books[i].id}" contenteditable="true">${books[i].pages}</span> / ${books[i].totalPages} </td><td><select id="select${books[i].id}" name="Status">
      <option value="inprogress">In Progress</option>
      <option value="complete">Complete</option></select>
    </select></td><td><button class="update" data-updateid="${books[i].id}">Update</button></td></tr>`)
    }
  })
}
// run showBooks
showBooks();

// function to edit books table / update database / update button
function updateStatus(event){
  event.preventDefault();
  let id = $(this).data("updateid");
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
  $.put("/api/book/"+id, newstatus).then(console.log("Row updated!"))
}
// on click for the update status function
$(document).on("click", "button.update",updateStatus)

// function to create a new user data and post it to the database
function newUser(event) {
  event.preventDefault();
  // store input fields into an object
  var user = {
    UserName: $("#newEmail").text(),
    password: $("#newPassword").text(),
    booksGoal: $("#bookGoal").text()
  };
  console.log(user);
  // posts the user to the users table
  //$.post("/api/users", user);
}
// calls newUser upon clicking of appropriate button
$(document).on("click", "button#confirmReg", newUser);

// function to add a book
function newBook(event) {
  event.preventDefault();
  // store values in a variable
  var newBook = {
    title: $("").val(),
    author:$("").val(),
    totalPages:$("").val(),
    status:$("").val()
  }
  // may need app.post ?
  $.post("/api/books", function(req, res) {
    db.Books.create(newBook).then(function(dbBooks) {
      res.json(dbBooks);
    });
  }).then(showBooks);
};
// on click functionality
$(document).on("click","#nb",newBook);

// closing document.ready function
});