import { select, selectAll } from './domUtils.js  ';

class Display {
  constructor() {
    this.switchDisplay = this.switchDisplay.bind(this);
  }

  _removeSections() {
    return selectAll('section').forEach((section) => section.classList.add('hidden'));
  }

  switchDisplay(event) {
    event.preventDefault();
    const link = event.target.closest('li');
    if (!link) return;
    const id = link.firstElementChild.getAttribute('href');
    this._removeSections();
    select(id).classList.remove('hidden');
  }
}

export default new Display();
