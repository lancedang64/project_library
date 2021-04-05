'use strict'

let myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
    this.info = function() {
        let readStatus = isRead ? "has been read" : "not read yet";
        const info = `${title}  by ${author}, ${pages} pages, ${readStatus}`;
        return info;
    }
}

function addBookToLibrary(bookObject) {
    myLibrary.push(bookObject);
}

const firstBook = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

addBookToLibrary(firstBook);


