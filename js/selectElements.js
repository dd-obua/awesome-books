export const select = (selector) => document.querySelector(selector);
export const selectAll = (selector) => document.querySelectorAll(selector);

export const selectElements = () => {
  const inputTitle = select('.title');
  const inputAuthor = select('.author');
  const btnSubmit = select("button[type='submit']");
  const bookListElem = select('.book-list');
  const sectionSpecifier = select('.section-selector');
  const timeContainer = select('.time');

  return { inputTitle, inputAuthor, btnSubmit, bookListElem, sectionSpecifier, timeContainer };
};
