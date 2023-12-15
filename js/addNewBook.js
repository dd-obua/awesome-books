import { selectElements } from './selectElements.js';
import { displayBookList } from './displayBookList.js';
export const bookList = JSON.parse(localStorage.getItem('books')) || [];

const { inputTitle, inputAuthor } = selectElements();

const alreadyAdded = () => {
  return (
    bookList.length > 0 &&
    bookList.some(
      (book) =>
        book.title.toLowerCase() === inputTitle.value.toLowerCase() &&
        book.author.toLowerCase() === inputAuthor.value.toLowerCase()
    )
  );
};

const clearInputs = () => {
  inputTitle.value = '';
  inputAuthor.value = '';
};

export const addNewBook = () => {
  try {
    const empty = inputTitle.value === '' || inputAuthor.value === '';
    if (empty) throw new Error('Both title and author cannot be empty.');
    if (alreadyAdded()) throw new Error('Book already added.');
    bookList.push({ title: inputTitle.value, author: inputAuthor.value });
    localStorage.setItem('books', JSON.stringify(bookList));
    displayBookList(bookList);
  } catch (error) {
    alert(error);
  } finally {
    clearInputs();
  }
};
