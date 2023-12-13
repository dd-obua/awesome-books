'use strict';

const select = (selector) => document.querySelector(selector);

const inputTitle = select('.title');
const inputAuthor = select('.author');
const btnSubmit = select("button[type='submit']");
const bookListElem = select('.book-list');

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

    displayBookList(bookList);
  } catch (error) {
    console.error(error);
  } finally {
    clearInput();
  }
};

const removeBook = (index) => {
  bookList.splice(index, 1);
  displayBookList(bookList);
};

const clearContent = () => (bookListElem.innerHTML = '');

const displayBookList = (list) => {
  if (list.length < 0) return;
  clearContent();

  const bookMarkup = list
    .map((book, index) => {
      book.index = index;
      return `
        <li>
          <p>${book.title}</p>
          <p>${book.author}</p>
          <button class="remove-btn" data-index="${index}">Remove</button>
        </li>
      `;
    })
    .join('');

  bookListElem.insertAdjacentHTML('beforeend', bookMarkup);
};

bookListElem.addEventListener('click', (event) => {
  const removeBtn = event.target.closest('.remove-btn');
  if (!removeBtn) return;
  const index = removeBtn.dataset.index;
  removeBook(index);
});

btnSubmit.addEventListener('click', addBook);
