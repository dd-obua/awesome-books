'use strict';

const select = (selector) => document.querySelector(selector);

const inputTitle = select('.title');
const inputAuthor = select('.author');
const btnSubmit = select("button[type='submit']");

const bookList = [];

const alreadyAdded = () => {
  return (
    bookList.length > 0 &&
    bookList.some((book) => book.title === inputTitle.value && book.author === inputAuthor.value)
  );
};

const clearInput = () => {
  inputTitle.value = '';
  inputAuthor.value = '';
};

const addBook = (title, author) => {
  try {
    const empty = inputTitle.value === '' || inputAuthor.value === '';
    if (empty) throw new Error("Both title and author can't be empty.");

    if (alreadyAdded()) throw new Error('Book already added');

    bookList.push({
      title: inputTitle.value,
      author: inputAuthor.value,
    });

    console.log(bookList);
  } catch (error) {
    console.error(error);
  } finally {
    clearInput();
  }
};

btnSubmit.addEventListener('click', addBook);
