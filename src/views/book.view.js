import BookTable from './modules/BookTable';
import ActionBar from './modules/ActionBar';
import BookModal from './modules/BookModal';
import BookItem from './modules/BookItem';
import inputValidate from '../helper/formValidate';

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
    this.modal = this.app.querySelector('.modal');
    this.closeModal = this.app.querySelector('#close-btn');
    this.openModal = this.app.querySelector('#add-btn');
    this.closeModal.addEventListener('click', () => this.toggleModal());
    this.openModal.addEventListener('click', () => this.toggleModal());

    this.form = document.querySelector('.book-form');
    inputValidate(this.form, 'book-title', 'Title');
    inputValidate(this.form, 'book-author', 'Author');
    inputValidate(this.form, 'book-number', 'Quantity');
    inputValidate(this.form, 'book-price', 'Price');
  }

  get formData() {
    const bTitle = this.form.querySelector('input[name="book-title"]').value;
    const bAuthor = this.form.querySelector('input[name="book-author"]').value;
    const bCategory = this.form.querySelector(
      'input[name="book-category"]',
    ).value;
    const bStatus =
      this.form.querySelector('input[name="book-status"]').value === 'active';
    const bNumber = this.form.querySelector('input[name="book-number"]').value;
    const bPrice = this.form.querySelector('input[name="book-price"]').value;

    return {
      title: bTitle,
      author: bAuthor,
      category: bCategory,
      status: bStatus,
      number: parseInt(bNumber, 10),
      price: parseFloat(bPrice),
    };
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

  bindAddBook(handel) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      handel(this.formData);
    });
  }

  toggleModal() {
    if (this.modal.classList.contains('hidden')) {
      this.modal.classList.remove('hidden');
    } else this.modal.classList.add('hidden');
  }
}

export default BookView;
