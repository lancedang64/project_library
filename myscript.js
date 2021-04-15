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

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function addBookToDisplay(book) {
  const newTableRow = document.createElement("tr");
  newTableRow.id = book.title;
  const bookInfoArray = book.getBookInfo();
  bookInfoArray.forEach(info => {
    const newTableData = document.createElement("td");
    if (info == "READ" || info == "NOT READ") {
      newTableData.appendChild(getReadStatusButton(info));
    } else {
      newTableData.textContent = info;
    }
    newTableRow.appendChild(newTableData);
  });
  newTableRow.appendChild(getDeleteButtonCell(book.title));
  bookTable.appendChild(newTableRow);
}

function getDeleteButtonCell(title) {
  const tdElement = document.createElement("td");
  const button = document.createElement("button");
  button.id = "delete-" + title;
  button.className = "button-delete";
  button.textContent = "DELETE";
  button.addEventListener("click", deleteBook);
  tdElement.appendChild(button);
  return tdElement;
}

function getReadStatusButton(info) {
  const button = document.createElement("button");
  button.textContent = info;
  // Add event listener
  return button;
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

function deleteBook(e) {
  const title = e.target.id.slice(7);
  const updatedLibrary = myLibrary.filter(book => book.title != title);
  myLibrary = updatedLibrary;
  const bookTableRow = document.getElementById(title);
  bookTableRow.remove();
}

function testFunc() {console.log("Hi");}

const bookTable = document.getElementById("book-table");
const firstBook = new Book("The Hobbit", "J.R.R. Tolkien", 295, "READ");
let myLibrary = [];

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", submitNewBook);

addBookToDisplay(firstBook);

/* To-do list
- Throw confirmation for delete function
- Require user to fill in blank text field
- Read -> Not Read button for entries
- Calibri text font instead
- increase opacity
 */
