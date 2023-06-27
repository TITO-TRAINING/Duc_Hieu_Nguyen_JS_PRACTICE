import BookTable from './modules/BookTable';
import ActionBar from './modules/ActionBar';
import BookModal from './modules/BookModal';
import BookItem from './modules/BookItem';
import inputValidate from '../helper/formValidate';
import { createToast, removeToast } from './components/handleToast';

class BookView {
  constructor() {
    this.app = document.querySelector('#root');
    this.app.innerHTML += BookModal({});

    this.container = document.createElement('div');
    this.container.classList.add('container');
    // add toast container
    this.toastList = document.createElement('ul');
    this.toastList.classList.add('notifications');

    this.container.appendChild(this.toastList);
    this.container.innerHTML += ActionBar();
    this.container.innerHTML += BookTable();

    // add modules
    this.app.appendChild(this.container);

    this.modal = this.app.querySelector('.modal');
    this.table = document.querySelector('.book-list');

    this.form = document.querySelector('.book-form');
    inputValidate(this.form, 'book-title', 'Title');
    inputValidate(this.form, 'book-author', 'Author');
    inputValidate(this.form, 'book-number', 'Quantity');
    inputValidate(this.form, 'book-price', 'Price');
  }

  get idModal() {
    return this.form.querySelector('#book-id').value;
  }

  set idModal(id) {
    this.form.querySelector('#book-id').value = id;
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

  set formData({
    id = '',
    title = '',
    author = '',
    category = '',
    status = false,
    number = 0,
    price = 0,
  }) {
    this.form.querySelector('#book-id').value = id;
    this.form.querySelector('input[name="book-title"]').value = title;
    this.form.querySelector('input[name="book-author"]').value = author;
    this.form.querySelector('input[name="book-category"]').value = category;
    this.form.querySelector(
      `input[name="book-status"][value="active"]`,
    ).checked = status;
    this.form.querySelector(
      `input[name="book-status"][value="inactive"]`,
    ).checked = !status;
    this.form.querySelector('input[name="book-number"]').value = number;
    this.form.querySelector('input[name="book-price"]').value = price;
  }

  displayData(books) {
    while (this.table.firstChild) {
      this.table.removeChild(this.table.firstChild);
    }

    if (books.length === 0) {
      createToast('info', 'Your data is empty !');
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
      this.formData = {};
    });
  }

  bindDeleteBook(handel) {
    let id;
    this.table.addEventListener('click', (e) => {
      if (e.target.closest('.btn-delete')) {
        id = e.target.closest('.btn-delete').dataset.id;
        handel(id);
      }
    });
  }

  bindUpdateBook(handel) {
    const btn = this.modal.querySelector('.update-btn');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      handel(this.idModal, this.formData);
      this.toggleModal();
      this.formData = {};
    });
  }

  bindUpdateModal() {
    let id;
    this.table.addEventListener('click', (e) => {
      if (e.target.closest('.btn-edit')) {
        id = e.target.closest('.btn-edit').dataset.id;
        this.toggleModal();
        this.idModal = id;

        const data = e.target.closest('tr').querySelectorAll('td');
        this.formData = {
          id: data[0].textContent,
          title: data[1].textContent,
          author: data[2].textContent,
          category: data[3].textContent,
          status: data[4].firstElementChild.classList.contains('active'),
          number: data[5].textContent,
          price: data[6].textContent,
        };
      }
    });
  }

  bindToggleStatus(handel) {
    let id;
    this.table.addEventListener('click', (e) => {
      if (e.target.classList.contains('status-btn')) {
        id = e.target.getAttribute('data-id');
        handel(id);
      }
    });
  }

  bindSearch(handel) {
    const input = this.container.querySelector('#search-box');
    input.addEventListener('keypress', (e) => {
      if (e.keyCode === 13) handel(e.target.value);
    });

    input.addEventListener('keydown', (e) => {
      if (e.keyCode === 46 || e.keyCode === 8) handel('');
    });
  }

  handelToggleModal() {
    const closeModal = this.app.querySelector('#close-btn');
    const openModal = this.app.querySelector('#add-btn');
    openModal.addEventListener('click', () => {
      if (this.modal.classList.contains('hidden')) {
        this.modal.classList.remove('hidden');
      }
    });
    closeModal.addEventListener('click', () => {
      this.modal.classList.add('hidden');
    });
  }

  bindCloseToast() {
    const toast = this.container.querySelector('.notifications');
    toast.addEventListener('click', (e) => {
      if (e.target.classList.contains('ti-close')) {
        removeToast(e.target.parentNode);
      }
    });
  }
}

export default BookView;
