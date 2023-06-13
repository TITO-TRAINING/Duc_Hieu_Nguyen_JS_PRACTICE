import BookTable from './modules/BookTable';
import ActionBar from './modules/ActionBar';
import BookModal from './modules/BookModal';

class BookView {
  constructor() {
    this.app = document.querySelector('#root');
    this.app.innerHTML = ActionBar();
    this.app.innerHTML += BookModal({});

    this.container = document.createElement('div');
    this.container.classList.add('container');
    this.container.innerHTML = BookTable();

    this.table = document.querySelector('.book-list');

    // add modules
    this.app.append(this.container);
  }
}

export default BookView;
