const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => document.querySelectorAll(selector);

const inputTitle = select('.title');
const inputAuthor = select('.author');
const btnSubmit = select("button[type='submit']");
const bookListElem = select('.book-list');
const sectionSpecifier = select('.section-selector');
const timeContainer = select('.time');

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
    localStorage.setItem('books', JSON.stringify(bookList));
    displayBookList(bookList);
  } catch (error) {
    alert(error);
  } finally {
    clearInputs();
  }
};

const removeBook = (index) => {
  bookList.splice(index, 1);
  displayBookList(bookList);
};

const removeBookUI = (event) => {
  const btnRemove = event.target.closest('.btn-remove');
  if (!btnRemove) return;
  const id = btnRemove.dataset.index;
  removeBook(id);
};

const clearContent = () => (bookListElem.innerHTML = '');

const displayBookList = (list) => {
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
  bookListElem.innerHTML = '';
  bookListElem.insertAdjacentHTML('beforeend', listMarkup);
};

const removeSections = () => {
  return selectAll('section').forEach((section) => section.classList.add('hidden'));
};

const switchDisplay = (event) => {
  event.preventDefault();
  const link = event.target.closest('li');
  if (!link) return;
  const id = link.firstElementChild.getAttribute('href');
  removeSections();
  select(id).classList.remove('hidden');
};

const displayTime = () => {
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
};

displayBookList(bookList);
bookListElem.addEventListener('click', removeBookUI.bind(this));
btnSubmit.addEventListener('click', addNewBook.bind(this));
sectionSpecifier.addEventListener('click', switchDisplay.bind(this));
setInterval(() => (timeContainer.innerHTML = displayTime()), 1000);
