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
const bookTable = document.getElementById("book-table");
const submitButton = document.getElementById("submit-button");
const firstBook = new Book("The Hobbit", "J.R.R. Tolkien", 295, "READ");
let saved = localStorage.getItem('bookTable');
let myLibrary = [];

addBookToLibrary(firstBook);
addBookToDisplay(firstBook);

submitButton.addEventListener("click", submitNewBook);

// if (saved) {
//   bookTable.innerHTML = saved;
// }

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

  //localStorage.setItem('bookTable', bookTable.innerHTML);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function addBookToDisplay(book) {
  const newTableRow = document.createElement("tr");
  newTableRow.id = book.title;
  bookTable.appendChild(newTableRow);
  const bookInfoArray = book.getBookInfo();
  bookInfoArray.forEach((info) => {
    const newTableData = document.createElement("td");
    if (info == "READ" || info == "NOT READ") {
      newTableData.appendChild(getReadStatusButton(info, book.title));
    } else {
      newTableData.textContent = info;
    }
    newTableRow.appendChild(newTableData);
  });
  newTableRow.appendChild(getDeleteButtonCell(book.title));
}

function getDeleteButtonCell(title) {
  const tdElement = document.createElement("td");
  const button = document.createElement("button");
  button.id = "delete-" + title;
  button.className = "button-delete";
  button.textContent = "DELETE";
  button.onclick = deleteBook(title);
  tdElement.appendChild(button);
  return tdElement;
}

function getReadStatusButton(readStatusInfo, title) {
  const button = document.createElement("button");
  button.textContent = readStatusInfo;
  button.id = "read-status-" + title;
  button.addEventListener("click", changeReadStatus);
  return button;
}

function deleteBook(title) {
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

// if(!localStorage.getItem('myLibrary')) {
//   populateStorage();
// } else {
//   setDataItems();
// }

function populateStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  localStorage.setItem("pageContent", document.documentElement.innerHTML);

  setDataItems();
}

function setDataItems() {
  let currentLibraryJSON = localStorage.getItem("myLibrary");
  let currentPageContent = localStorage.getItem("pageContent");

  myLibrary = JSON.parse(currentLibraryJSON);
  document.documentElement.innerHTML = currentPageContent;
}

/* To-do list
- Throw confirmation for delete function
- Require user to fill in blank text field
- Debug localStorage functions *maybe .onchange????*
 */
