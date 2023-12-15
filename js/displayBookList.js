import { selectElements } from './selectElements.js';

const { bookListElem } = selectElements();

const clearContent = () => (bookListElem.innerHTML = '');

class Books {
  displayBookList(list) {
    const listMarkup = list
      .map((book, index) => {
        book.id = index;
        return `
          <li>
            <p>"${book.title}" by ${book.author}</p>
            <p><button class="btn-remove" data-index="${index}">Remove</button></p>
          </li>
        `;
      })
      .join('');
    clearContent();
    bookListElem.insertAdjacentHTML('beforeend', listMarkup);
  }
}

export default new Books();
