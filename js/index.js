import { displayTime } from './displayTime.js';
import { selectElements } from './selectElements.js';
import { bookList, addNewBook } from './addNewBook.js';
import { displayBookList } from './displayBookList.js';
import { removeBookUI } from './removeBook.js';
import { switchDisplay } from './switchDisplay.js';

const { btnSubmit, bookListElem, sectionSpecifier, timeContainer } = selectElements();

displayBookList(bookList);
bookListElem.addEventListener('click', removeBookUI.bind(this));
btnSubmit.addEventListener('click', addNewBook.bind(this));
sectionSpecifier.addEventListener('click', switchDisplay.bind(this));
setInterval(() => (timeContainer.innerHTML = displayTime()), 1000);
