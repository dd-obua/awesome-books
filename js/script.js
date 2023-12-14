class Book {
  _inputTitle = this._select('.title');
  _inputAuthor = this._select('.author');
  _btnSubmit = this._select("button[type='submit']");
  _bookListElem = this._select('.book-list');
  _sectionSpecifier = this._select('.section-selector');
  _timeContainer = this._select('.time');
  _updateTime;

  _bookList = JSON.parse(localStorage.getItem('books')) || [];

  constructor() {
    this._displayBookList(this._bookList);
    this._bookListElem.addEventListener('click', this._removeBookUI.bind(this));
    this._btnSubmit.addEventListener('click', this._addNewBook.bind(this));
    this._sectionSpecifier.addEventListener('click', this._switchDisplay.bind(this));
    this._updateTime = this._timeContainer.innerHTML = this._displayTime();
    this._updateTime = setInterval(() => {
      this._timeContainer.innerHTML = this._displayTime();
    }, 1000);
  }

  _select(selector) {
    return document.querySelector(selector);
  }

  _selectAll(selector) {
    return document.querySelectorAll(selector);
  }

  _alreadyAdded() {
    return (
      this._bookList.length > 0 &&
      this._bookList.some(
        (book) =>
          book.title.toLowerCase() === this._inputTitle.value.toLowerCase() &&
          book.author.toLowerCase() === this._inputAuthor.value.toLowerCase()
      )
    );
  }

  _clearInputs() {
    this._inputTitle.value = '';
    this._inputAuthor.value = '';
  }

  _addNewBook() {
    try {
      const empty = this._inputTitle.value === '' || this._inputAuthor.value === '';
      if (empty) throw new Error('Both title and author cannot be empty.');
      if (this._alreadyAdded()) throw new Error('Book already added.');
      this._bookList.push({ title: this._inputTitle.value, author: this._inputAuthor.value });
      localStorage.setItem('books', JSON.stringify(this._bookList));
      this._displayBookList(this._bookList);
    } catch (error) {
      alert(error);
    } finally {
      this._clearInputs();
    }
  }

  _removeBook(index) {
    this._bookList.splice(index, 1);
    this._displayBookList(this._bookList);
  }

  _removeBookUI(event) {
    const btnRemove = event.target.closest('.btn-remove');
    if (!btnRemove) return;
    const id = btnRemove.dataset.index;
    this._removeBook(id);
  }

  _clearContent() {
    this._bookListElem.innerHTML = '';
  }

  _displayBookList(list) {
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
    this._bookListElem.innerHTML = '';
    this._bookListElem.insertAdjacentHTML('beforeend', listMarkup);
  }

  _removeSections() {
    return this._selectAll('section').forEach((section) => section.classList.add('hidden'));
  }

  _switchDisplay(event) {
    event.preventDefault();
    const link = event.target.closest('li');
    if (!link) return;
    const id = link.firstElementChild.getAttribute('href');
    this._removeSections();
    this._select(id).classList.remove('hidden');
  }

  _displayTime() {
    const currentDate = new Date();
    // prettier-ignore
    const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
    const monthIndex = currentDate.getMonth();
    const dayOfMonth = currentDate.getDate();
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const standardHours = hours < 13 ? hours : hours % 12;
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const time = `${standardHours}:${minutes}:${seconds}`;
    const amOrPm = hours < 13 ? 'am' : 'pm';
    return `${months[monthIndex]} ${dayOfMonth}th ${year}, ${time} ${amOrPm}`;
  }
}

new Book();
