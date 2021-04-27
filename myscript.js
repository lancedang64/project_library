'use strict';

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

class Library {
  constructor(library) {
    this.library = library;
  }

  submitNewBook = () => {
    if (!this.getBookFromInput()) return;
    const book = this.getBookFromInput();
    this.addBookToLibrary(book);
    this.updateLocalStorage();
    submitForm.reset();
    this.remindUserInput(book);
  };

  getBookFromInput = () => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const readStatus = document.getElementById('read').checked
      ? 'READ'
      : 'NOT READ';
    const book = new Book(title, author, pages, readStatus);
    const isBookDetailFilled =
      book.title.trim() !== '' && book.author.trim() !== '' && book.pages > 0;
    return isBookDetailFilled ? book : this.remindUserInput(book);
  };

  remindUserInput = (book) => {
    const titleReminder = document.getElementById('title-reminder');
    const authorReminder = document.getElementById('author-reminder');
    const pagesReminder = document.getElementById('pages-reminder');
    const reminder = '*please fill in this field';
    titleReminder.textContent = book.title.trim() === '' ? reminder : '';
    authorReminder.textContent = book.author.trim() === '' ? reminder : '';
    pagesReminder.textContent = book.pages <= 0 ? reminder : '';
  };

  addBookToLibrary = (book) => {
    this.library.push(book);

    const newTableRow = document.createElement('tr');
    newTableRow.id = book.title;
    newTableRow.innerHTML += '<td>' + book.title + '</td>';
    newTableRow.innerHTML += '<td>' + book.author + '</td>';
    newTableRow.innerHTML += '<td>' + book.pages + '</td>';
    newTableRow.appendChild(this.getReadStatusTD(book));
    newTableRow.appendChild(this.getDeleteTD(book));
    bookTable.appendChild(newTableRow);

  };

  getDeleteTD = (book) => {
    const tdElement = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.id = 'delete-' + book.title;
    deleteButton.className = 'delete';
    deleteButton.textContent = 'DELETE';
    deleteButton.addEventListener('click', this.deleteBook);
    tdElement.appendChild(deleteButton);
    return tdElement;
  };

  getReadStatusTD = (book) => {
    const readStatusTD = document.createElement('td');
    const readStatusButton = document.createElement('button');
    readStatusButton.textContent = book.readStatus;
    readStatusButton.id = 'read-status-' + book.title;
    readStatusButton.className = 'read-status';
    readStatusButton.addEventListener('click', this.changeReadStatus);
    readStatusTD.appendChild(readStatusButton);
    return readStatusTD;
  };

  deleteBook = (e) => {
    const title = e.target.id.slice(7);
    this.library = this.library.filter((book) => book.title != title);
    document.getElementById(title).remove();
    this.updateLocalStorage();
  };

  changeReadStatus = (e) => {
    const title = e.target.id.slice(12);
    const currentReadStatus = e.target.innerText;
    const newReadStatus = currentReadStatus === 'READ' ? 'NOT READ' : 'READ';
    const readStatusButton = document.getElementById(e.target.id);
    const bookIndex = this.library.findIndex((book) => book.title === title);

    this.library[bookIndex].readStatus = newReadStatus;
    readStatusButton.textContent = newReadStatus;

    this.updateLocalStorage();
  };

  updateLocalStorage = () => {
    localStorage.setItem('bookTable', bookTable.innerHTML);
    localStorage.setItem('myLibrary', JSON.stringify(this.library));
  };
}

class localStorageController {
  constructor() {
    this.bookTable = localStorage.getItem('bookTable');
    this.library = localStorage.getItem('myLibrary');
  }

  deploySavedState = (bookTableElement, libraryObject) => {
    if (this.bookTable) {
      bookTableElement.innerHTML = this.bookTable;
      libraryObject.library = JSON.parse(this.library);
    }
  }
}

const bookTable = document.getElementById('book-table');
const submitForm = document.getElementById('submit-form');
const exampleBook = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'READ');

const myLibrary = new Library([]);
myLibrary.addBookToLibrary(exampleBook);

let savedBookTable = localStorage.getItem('bookTable');
let savedLibrary = localStorage.getItem('myLibrary');
if (savedBookTable) {
  bookTable.innerHTML = savedBookTable;
  myLibrary.library = JSON.parse(savedLibrary);
}

const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', myLibrary.submitNewBook);

const readStatusButtons = document.querySelectorAll('button.read-status');
readStatusButtons.forEach((button) =>
  button.addEventListener('click', myLibrary.changeReadStatus)
);

const deleteButons = document.querySelectorAll('button.delete');
deleteButons.forEach((button) =>
  button.addEventListener('click', myLibrary.deleteBook)
);

/* To-do list
 */
