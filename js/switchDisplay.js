import { select, selectAll } from './selectElements.js';

const removeSections = () => {
  return selectAll('section').forEach((section) => section.classList.add('hidden'));
};

export const switchDisplay = (event) => {
  event.preventDefault();
  const link = event.target.closest('li');
  if (!link) return;
  const id = link.firstElementChild.getAttribute('href');
  removeSections();
  select(id).classList.remove('hidden');
};
