import { bookList } from './addNewBook.js';
import { displayBookList } from './displayBookList.js';

const removeBook = (index) => {
  bookList.splice(index, 1);
  displayBookList(bookList);
};

export const removeBookUI = (event) => {
  const btnRemove = event.target.closest('.btn-remove');
  if (!btnRemove) return;
  const id = btnRemove.dataset.index;
  removeBook(id);
};
