import { displayTime } from './modules/displayTime.js';
import { selectElements } from './modules/selectElements.js';
import { initializeBookList, addNewBook } from './modules/addNewBook.js';
import { removeBookUI } from './modules/removeBook.js';
import books from './modules/displayBookList.js';
import display from './modules/switchDisplay.js';

const { btnSubmit, bookListElem, sectionSpecifier, timeContainer } =
  selectElements();
const bookList = initializeBookList();

books.displayBookList(bookList);
bookListElem.addEventListener('click', removeBookUI.bind(this));
btnSubmit.addEventListener('click', addNewBook.bind(this));
sectionSpecifier.addEventListener('click', display.switchDisplay);
setInterval(() => (timeContainer.innerHTML = displayTime()), 1000);
