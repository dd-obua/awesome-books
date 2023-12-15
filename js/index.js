import { displayTime } from './displayTime.js';
import { selectElements } from './selectElements.js';
import { initializeBookList, addNewBook } from './addNewBook.js';
import { removeBookUI } from './removeBook.js';
import books from './displayBookList.js';
import display from './switchDisplay.js';

const { btnSubmit, bookListElem, sectionSpecifier, timeContainer } = selectElements();
const bookList = initializeBookList();

books.displayBookList(bookList);
bookListElem.addEventListener('click', removeBookUI.bind(this));
btnSubmit.addEventListener('click', addNewBook.bind(this));
sectionSpecifier.addEventListener('click', display.switchDisplay);
setInterval(() => (timeContainer.innerHTML = displayTime()), 1000);
