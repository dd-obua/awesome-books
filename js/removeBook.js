import { bookList } from './addNewBook.js';
import { updateStorage } from './helper .js';
import books from './displayBookList.js';

const removeBook = (index) => {
  bookList.splice(index, 1);
  updateStorage('books', bookList);
  books.displayBookList(bookList);
};

export const removeBookUI = (event) => {
  const btnRemove = event.target.closest('.btn-remove');
  if (!btnRemove) return;
  const id = parseInt(btnRemove.dataset.index, 10);
  removeBook(id);
};
