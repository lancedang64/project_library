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
  const bookArray = book.getBookInfo();
  bookArray.forEach((info) => {
    const newTableData = document.createElement("td");
    if (info == "READ" || info == "NOT READ") {
      const newReadButton = document.createElement("button");
      newReadButton.textContent = info;
      newTableData.appendChild(newReadButton);
    } else {
      newTableData.textContent = info;
    }
    newTableRow.appendChild(newTableData);
  });
  bookTable.appendChild(newTableRow);
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

const bookTable = document.getElementById("book-table");
const firstBook = new Book("The Hobbit", "J.R.R. Tolkien", 295, "READ");
const secondBook = new Book("Harry Porter", "J.K. Rowling", 450, "NOT READ");

let myLibrary = [];

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", submitNewBook);

addBookToLibrary(firstBook);
addBookToLibrary(secondBook);

myLibrary.forEach((book) => addBookToDisplay(book));

/* To-do list
*/
