"use strict";

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function () {
      let readStatus = isRead ? "has been read" : "not read yet";
      const info = `${title} by ${author}, ${pages} pages, ${readStatus}`;
      return info;
    };
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBookOnPage(array) {
  array.forEach((book) => {
    const bookEntry = getBookEntry(book);
    bookEntryTable.appendChild(bookEntry);
  });
}

function getBookEntry(book) {
  const bookEntry = document.createElement("div");
  bookEntry.className = "bookEntry";
  bookEntry.style.borderStyle = "solid";
  bookEntry.style.borderColor = "black";
  bookEntry.style.margin = "10px";
  bookEntry.style.padding = "5px";
  bookEntry.textContent = book.info();
  return bookEntry;
}

const bookEntryTable = document.getElementById("bookEntryTable");
const firstBook = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const secondBook = new Book("Harry Porter", "J.K. Rowling", 450, true);

let myLibrary = [];

addBookToLibrary(firstBook);
addBookToLibrary(secondBook);
//displayBookOnPage(myLibrary);

/* To-do list
- create a BookEntry Class, change UI to a table instead 
*/