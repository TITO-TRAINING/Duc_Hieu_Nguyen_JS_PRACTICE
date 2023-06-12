import BookTable from './modules/BookTable';
import ActionBar from './modules/ActionBar';

class BookView {
  constructor() {
    this.app = this.getElement('#root');
    this.app.innerHTML = ActionBar;
    this.container = this.createElement('div', 'container');
    this.container.innerHTML = BookTable;

    this.table = this.getElement('.book-list');

    // add modules
    this.app.append(this.container);
  }

  static createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  static getElement(selector) {
    return document.querySelector(selector);
  }
}

export default BookView;
