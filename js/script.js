'use strict';

const select = (selector) => document.querySelector(selector);

const inputTitle = select('.title');
const inputAuthor = select('.author');
const btnSubmit = select("button[type='submit']");
const bookListElem = select('.book-list');

const bookList = JSON.parse(localStorage.getItem('books')) || [];

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

const addNewBook = () => {
  try {
    const empty = inputTitle.value === '' || inputAuthor.value === '';
    if (empty) throw new Error('Both title and author cannot be empty.');
    if (alreadyAdded()) throw new Error('Book already added.');
    bookList.push({ title: inputTitle.value, author: inputAuthor.value });
    displayBookList(bookList);
  } catch (error) {
    console.error(error);
  } finally {
    clearInputs();
  }
};

const removeBook = (index) => {
  bookList.splice(index, 1);
  displayBookList(bookList);
};

const clearContent = () => (bookListElem.innerHTML = '');

const displayBookList = (list) => {
  const listMarkup = list
    .map((book, index) => {
      book.id = index;
      return `
        <li>
          <p>${book.title}</p>
          <p>${book.author}</p>
          <button class="btn-remove" data-index="${index}">Remove</button>
        </li>
      `;
    })
    .join('');
  bookListElem.innerHTML = '';
  bookListElem.insertAdjacentHTML('beforeend', listMarkup);
};

bookListElem.addEventListener('click', (event) => {
  const removeBtn = event.target.closest('.remove-btn');
  if (!removeBtn) return;
  const index = removeBtn.dataset.index;
  removeBook(index);
});

btnSubmit.addEventListener('click', addNewBook);

displayBookList(bookList);
