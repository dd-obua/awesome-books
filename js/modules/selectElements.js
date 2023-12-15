import { select } from './domUtils.js';

export const selectElements = () => {
  const inputTitle = select('.title');
  const inputAuthor = select('.author');
  const btnSubmit = select("button[type='submit']");
  const bookListElem = select('.book-list');
  const sectionSpecifier = select('.section-selector');
  const timeContainer = select('.time');

  return { inputTitle, inputAuthor, btnSubmit, bookListElem, sectionSpecifier, timeContainer };
};
