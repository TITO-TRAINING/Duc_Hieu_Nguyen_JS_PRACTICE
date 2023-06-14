import BookTable from './modules/BookTable';
import ActionBar from './modules/ActionBar';
import BookModal from './modules/BookModal';
import BookItem from './modules/BookItem';

class BookView {
  constructor() {
    this.app = document.querySelector('#root');
    this.app.innerHTML = BookModal({});

    this.container = document.createElement('div');
    this.container.classList.add('container');
    this.container.innerHTML = ActionBar();
    this.container.innerHTML += BookTable();

    // add modules
    this.app.append(this.container);

    this.table = document.querySelector('.book-list');

    // handel toggle modal
    this.modal = document.querySelector('.modal');
    this.closeModal = document.querySelector('#close-btn');
    this.openModal = document.querySelector('#add-btn');
    this.closeModal.addEventListener('click', () => this.toggleModal());
    this.openModal.addEventListener('click', () => this.toggleModal());

    this.form = document.querySelector('.book-form');
  }

  displayData(books) {
    while (this.table.firstChild) {
      this.table.removeChild(this.table.firstChild);
    }

    if (books.length === 0) {
      const p = document.createElement('p');
      p.classList.add('notify');
      p.textContent = "Your data is empty! Let's add something !";
      this.container.append(p);
    } else {
      books.forEach((book) => {
        this.table.innerHTML += BookItem(book);
      });
    }
  }

  toggleModal() {
    if (this.modal.classList.contains('hidden')) {
      this.modal.classList.remove('hidden');
    } else this.modal.classList.add('hidden');
  }
}

export default BookView;
