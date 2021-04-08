"use strict";

let myLibrary = [];

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this.info = function () {
            let readStatus = isRead ? "has been read" : "not read yet";
            const info = `${title}  by ${author}, ${pages} pages, ${readStatus}`;
            return info;
        };
    }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBookOnPage(array) {
  array.forEach((book) => {
    const bookCard = getBookCard(book);
    bookCardsContainer.appendChild(bookCard);
  });
}

function getBookCard(book) {
  const bookCard = document.createElement("div");
  bookCard.className = "bookCard";
  bookCard.style.fontSize = "10px";
  bookCard.style.borderStyle = "solid";
  bookCard.style.borderColor = "black";
  bookCard.style.margin = "10px";
  bookCard.style.padding = "5px";

  bookCard.textContent = book.info();
  return bookCard;
}

const bookCardsContainer = document.getElementById("bookCardsContainer");
const firstBook = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const secondBook = new Book("Harry Porter", "J.K. Rowling", 450, true);

addBookToLibrary(firstBook);
addBookToLibrary(secondBook);
displayBookOnPage(myLibrary);
