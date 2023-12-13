'use strict';

const select = (selector) => document.querySelector(selector);

const inputTitle = select('.title');
const inputAuthor = select('.author');
const btnSubmit = select("button[type='submit']");

const bookList = [];
