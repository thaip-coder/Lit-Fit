$(document).ready(function(){

// Login Modal
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})

/* BACKEND INTEGRATION */
// declare books as an empty array, this will be updated every time the showBooks function is called and iterated to display in our HTML
var books = [];
// boolean to see if someone is logged in, defaults to false
var loggedIn = false;
// function to display our user's books
function showBooks(){
  $.get("/api/all", function(data){
    // store data in an array
    books = data;
    if (loggedIn) {
      // loop over books object array to populate table
      for (let i = 0; i < books.length; i++) {
        let bookStat = "";
        if (books[i].status) { bookStat = "In Progress" } else { bookStat = "Complete" }
        $("tbody").append(`<tr><td class="pt-3-half" contenteditable="true">${books[i].title}</td><td>${books[i].author}</td><td class="pt-3-half" contenteditable="true"> <span id="span${books[i].id}" data-pageid="${books[i].id}" contenteditable="true">${books[i].pages}</span></td><td class="pt-3-half"> ${books[i].totalPages} </td>
        <td class="pt-3-half" contenteditable="true"><select id="select${books[i].id}" name="Status">
        <option value="inprogress">In Progress</option>
        <option value="complete">Complete</option></select>
        </select></td><td>
        <span class="table-remove"><button type="button"
            class="btn btn-danger btn-rounded btn-sm my-0">Update</button></span>
        </td></td></tr>`)
      }
    } else {
      $("#tablecard").append('<div style="margin: 0 auto;"><p style="text-align:center;"><h4>Please login to see your book progress!</h4></p></div>');
    }
  })
}
// run showBooks
showBooks();

// function to login an existing user
function login () {
  let email = $("#email").val();
  let password = $("#password").val();
  let users = [];
  $.get("/api/users", function(data){
    users = data;
    for (let j=0; j < users.length; j++) {
      if (email === users[i].UserName && password === users[i].password) {
        loggedIn = true;
      }
    }
  })

}

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
    UserName: $("#newEmail").val(),
    password: $("#newPassword").val(),
    booksGoal: parseInt($("#bookGoal").val())
  };
  console.log(`${user.UserName} has been added to the database!`);
  // posts the user to the users table
  $.post("/api/users", user).then(function(){
    // once user is posted to the table, empty the values of the input form
    $("#newEmail").empty();
    $("#newPassword").empty();
    $("#bookGoal").empty();
    // collapse the modal after
    $("#collapseExample").removeClass("show");
    $("#collapseExample").addClass("hidden");
  });
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