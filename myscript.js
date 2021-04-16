"use strict";

class Book {
  constructor(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.getBookInfo = function () {
      return [title, author, pages, readStatus];
    };
  }
}

function submitNewBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  let readStatus;
  if (document.getElementById("read").checked) readStatus = "READ";
  else readStatus = "NOT READ";

  const newBook = new Book(title, author, pages, readStatus);
  addBookToLibrary(newBook);
  addBookToDisplay(newBook);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function addBookToDisplay(book) {
  const newTableRow = document.createElement("tr");
  newTableRow.id = book.title;
  bookTable.appendChild(newTableRow);

  newTableRow.innerHTML += '<td>' + book.title + '</td>';
  newTableRow.innerHTML += '<td>' + book.author + '</td>';
  newTableRow.innerHTML += '<td>' + book.pages + '</td>';
  newTableRow.appendChild(getReadStatusTD(book));
  newTableRow.appendChild(getDeleteTD(book));
}

function getDeleteTD(book) {
  const tdElement = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.id = "delete-" + book.title;
  deleteButton.className = "delete";
  deleteButton.textContent = "DELETE";
  //deleteButton.addEventListener("click", deleteBook);
  tdElement.appendChild(deleteButton);
  return tdElement;
}

function getReadStatusTD(book) {
  const readStatusTD = document.createElement("td");
  const readStatusButton = document.createElement("button");
  readStatusButton.textContent = book.readStatus;
  readStatusButton.id = "read-status-" + book.title;
  readStatusButton.className = "read-status";
  //readStatusButton.addEventListener("click", changeReadStatus);
  readStatusTD.appendChild(readStatusButton);
  return readStatusTD;
}

function deleteBook(e) {
  const title = e.target.id.slice(7);
  const updatedLibrary = myLibrary.filter((book) => book.title != title);
  myLibrary = updatedLibrary;

  const bookTableRow = document.getElementById(title);
  bookTableRow.remove();
}

function changeReadStatus(e) {
  const title = e.target.id.slice(12);
  const currentReadStatus = e.target.innerText;
  const readStatusButton = document.getElementById(e.target.id);
  const updatedLibrary = myLibrary.map((book) => {
    if (book.title == title) {
      if (currentReadStatus == "READ") {
        book.readStatus = "NOT READ";
        readStatusButton.textContent = "NOT READ";
      } else {
        book.readStatus = "READ";
        readStatusButton.textContent = "READ";
      }
    }
    return book;
  });
  myLibrary = updatedLibrary;
}

function testFunc(test) {
  console.log("testfunc", test);
}

const bookTable = document.getElementById("book-table");

let myLibrary = [];

const exampleBook = new Book("The Hobbit", "J.R.R. Tolkien", 295, "READ");
addBookToLibrary(exampleBook);
addBookToDisplay(exampleBook);

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", submitNewBook);

const readStatusButtons = document.querySelectorAll("button.read-status");
readStatusButtons.forEach(button => button.addEventListener("click", changeReadStatus));

const deleteButons = document.querySelectorAll("button.delete");
deleteButons.forEach(button => button.addEventListener("click", deleteBook));

/* To-do list
- Throw confirmation for delete function
- Require user to fill in blank text field
- Debug localStorage functions *maybe .onchange????*
 */
