"use strict";

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.getBookInfo = function () {
      let readStatus = isRead ? "Read" : "Not read yet";
      return [title, author, pages, readStatus];
    };
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function appendBookToTable(book) {
  const newTableRow = document.createElement("tr");
  const bookArray = book.getBookInfo();
  bookArray.forEach(info => {
    const newTableData = document.createElement("td");
    newTableData.textContent = info;
    newTableRow.appendChild(newTableData);
  });
  bookTable.appendChild(newTableRow);
}

const bookTable = document.getElementById("book-table");
const firstBook = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const secondBook = new Book("Harry Porter", "J.K. Rowling", 450, true);

let myLibrary = [];

addBookToLibrary(firstBook);
addBookToLibrary(secondBook);

myLibrary.forEach(book => appendBookToTable(book));

/* To-do list
- create a BookEntry Class, change UI to a table instead 
*/
