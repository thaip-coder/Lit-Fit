$(document).ready(function(){
// Login Modal
$("#logout").hide();
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
});
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
      for (var i=0; i < books.length; i++) {
        let bookStat = "";
        if (books[i].status) { bookStat = "In Progress" } else { bookStat = "Complete" }
        $("tbody").append(`<tr><td class="pt-3-half" contenteditable="true">${books[i].title}</td><td>${books[i].author}</td><td class="pt-3-half" contenteditable="true"> <span id="span${books[i].id}" data-pageid="${books[i].id}" contenteditable="true">${books[i].pages}</span></td><td class="pt-3-half"> ${books[i].totalPages} </td>
        <td class="pt-3-half" contenteditable="true"><select id="select${books[i].id}" name="Status">
        <option value="inprogress">In Progress</option>
        <option value="complete">Complete</option></select>
        </select></td><td>
        <span class="table-remove"><button data-updateid="${books[i].id}" type="button"
            class="btn btn-danger btn-rounded btn-sm my-0 update">Update</button></span>
        </td></td></tr>`)
      };
    } else {
      $("#tablecard").append('<div style="margin: 0 auto;"><p style="text-align:center;"><h4>Please login to see your book progress!</h4></p></div>');
    };
  });
};
// run showBooks
showBooks();

// function to login an existing user
function login (){
  let email = $("#email").val();
  let password = $("#password").val();
  let users = [];
  $.get("/api/users", function(data){
    users = data;
    for (let j=0; j < users.length; j++) {
      if (email === users[j].UserName && password === users[j].password) {
        console.log("Login successful!")
        loggedIn = true;
        let goals = users[j].booksGoal;
        $("#sideName").text(`Hello, ${email}!`);
        $("#sideGoal").append(` ${goals}`);
        $("#loginModal").modal("toggle");
        showBooks();
      }
    };
  });
};
$(document).on("click", "button#login2", login);


// function to edit books table / update database / update button
function updateStatus(event){
  event.preventDefault();
  let id = $(this).data("updateid");
  // update the object in the object array of books with the values from the row somehow
  let spanid = "span"+id
  console.log($("#"+spanid).text());
  let selectid = "select"+id;
  let statusSelect = $("#"+selectid).val();
  // takes the status and swaps it to a boolean
  if (statusSelect === "inprogress" ) {
    books[id].status = true;
  } else {
    books[id].status = false;
  }
  // parseInts the text and edits the object value
  books[id].pages = parseInt($("#"+spanid).text());
  // stores new statuses in object
  let newstatus = {
    status: books[id].status,
    pages: books[id].pages
  }
  // posts the edits to the table
  $.put("/api/book/"+id, newstatus).then(console.log("Row updated!"));
};
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
    $("#newEmail").val("");
    $("#newPassword").val("");
    $("#bookGoal").val("");
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
// function to add a blank row to our table
function tableAdd(){
  $("tbody").append(`<tr><td class="pt-3-half" contenteditable="true"><input class="form-control" id="newTitle" placeholder="Enter title"></td><td "pt-3-half"><input class="form-control" id="newAuthor" placeholder="Enter author"></td><td class="pt-3-half"><input class="form-control" id="newPages" placeholder="Pages read?"></td><td "pt-3-half"><input class="form-control" id="newTotal" placeholder="Total pages"></td>
  <td class="pt-3-half"><select id="newStatus" name="Status">
  <option value="inprogress">In Progress</option>
  <option value="complete">Complete</option></select>
  </select></td><td class="pt-3-half">
  <span class="table-remove"><button id="addNew" type="button"
      class="btn btn-primary btn-rounded btn-sm my-0">Add</button></span>
  </td></td></tr>`)
}
// on click functionality to add a new table row
$(document).on("click","button.table-add", tableAdd);

// function to add a new book
function newBook (){
  let newStatus;
  // boolean to set newStatus as a boolean so it can go in our table
  if ($("#newPages").val() === "inprogress") { newStatus = false } else { newStatus = true };
  let addedBook = {
    title: $("#newTitle").val(),
    author: $("#newAuthor").val(),
    totalPages: parseInt($("#newTotal").val()),
    status: newStatus,
    pages: $("#newPages").val()
  }
  $.post("/api/all", addedBook).then(function(){
    $("tbody").empty();
    // rerun showBooks w/ updated table
    showBooks();
  });
};
// on click functionality to add a new book to the database
$(document).on("click", "button#addNew", newBook)


$("#confirmReg").on("click", function() {
  $("#collapseExample").removeClass("show");
  $("#loginModal").modal("toggle");
  $("#register").hide();
  $("#logout").show();
})

$("#login2").on("click", function() {
  $("#collapseExample").removeClass("show");
  $("#loginModal").modal("toggle");
})
// closing document.ready function
});