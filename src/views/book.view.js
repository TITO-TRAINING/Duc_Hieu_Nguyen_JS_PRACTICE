import BookTable from './modules/BookTable';
import BookModal from './modules/BookModal';
import BookItem from './modules/BookItem';
import { createToast, removeToast } from './components/handleToast';
import validate from '../helper/formValidate';
import Header from './components/Header';
import Pagination from './modules/Pagination';

class BookView {
  constructor() {
    this.app = document.querySelector('#root');
    this.app.innerHTML += BookModal({});

    this.main = document.createElement('div');
    this.main.classList.add('main');

    this.container = document.createElement('div');
    this.container.classList.add('container');
    // add toast container
    this.toastList = document.createElement('ul');
    this.toastList.classList.add('notifications');

    this.main.innerHTML += Header();
    this.container.innerHTML += BookTable();

    this.pagination = document.createElement('div');
    this.pagination.classList.add('pagination-wrapper');
    this.container.appendChild(this.pagination);

    // add modules
    this.main.appendChild(this.container);
    this.app.appendChild(this.toastList);
    this.app.appendChild(this.main);

    this.modal = this.app.querySelector('.modal');
    this.table = document.querySelector('.book-list');

    this.form = document.querySelector('.book-form');
    validate(this.form);
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
    const bStatus = this.form.querySelector(
      `input[name="book-status"][value="active"]`,
    ).checked;
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
    const oldMsg = document.querySelector('.empty-msg');
    if (oldMsg) {
      oldMsg.remove();
    }

    if (books.length === 0) {
      const msg = document.createElement('p');

      msg.classList.add('empty-msg');
      msg.textContent = 'Your data is empty';
      msg.style.padding = '20px 10px';
      this.container.appendChild(msg);
    } else {
      books.forEach((book) => {
        this.table.innerHTML += BookItem(book);
      });
    }
  }

  displayPagination(total, cr) {
    while (this.pagination.firstChild) {
      this.pagination.removeChild(this.pagination.firstChild);
    }

    const pagination = Pagination(total, cr);
    this.pagination.appendChild(pagination);
    console.log(cr);
  }

  checkValidForm() {
    const inputs = [...this.form.querySelectorAll('input')];
    return !inputs.some((input) => input.classList.contains('invalid'));
  }

  clearInvalid() {
    const inputs = [...this.form.querySelectorAll('input')];
    inputs.map((input) => input.classList.remove('invalid'));
  }

  toggleModal(open = true) {
    if (this.modal.classList.contains('hidden') && open) {
      this.modal.classList.remove('hidden');
      this.main.classList.add('blur');
      this.clearInvalid();
    } else if (!open) {
      this.modal.classList.add('hidden');
      this.main.classList.remove('blur');
    }
  }

  toggleBtn(save = true) {
    const saveBtn = this.form.querySelector('.save-btn');
    const updateBtn = this.form.querySelector('.update-btn');
    if (save) {
      saveBtn.classList.remove('hidden');
      updateBtn.classList.add('hidden');
    } else {
      saveBtn.classList.add('hidden');
      updateBtn.classList.remove('hidden');
    }
  }

  handelToggleModal() {
    const closeModal = this.app.querySelector('#close-btn');
    const openModal = this.app.querySelector('#add-btn');
    openModal.addEventListener('click', () => {
      if (this.modal.classList.contains('hidden')) {
        this.clearInvalid();
        this.modal.classList.remove('hidden');
        this.main.classList.add('blur');
        this.toggleBtn();
      }
    });
    closeModal.addEventListener('click', () => {
      this.modal.classList.add('hidden');
      this.main.classList.remove('blur');
      this.formData = {};
    });
  }

  bindAddBook(handel) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.checkValidForm()) {
        handel(this.formData);
        this.formData = {};
        this.toggleModal(false);
        createToast('info', 'Insert Success!');
      } else createToast('warning', 'Insert Failed: Check your data!');
    });
  }

  bindDeleteBook(handel) {
    let id;
    this.table.addEventListener('click', (e) => {
      if (e.target.closest('.btn-delete')) {
        id = e.target.closest('.btn-delete').dataset.id;
        handel(id);
        createToast('info', 'Delete Success!');
      }
    });
  }

  bindUpdateBook(handel) {
    const btn = this.modal.querySelector('.update-btn');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.checkValidForm()) {
        handel(this.idModal, this.formData);
        this.toggleModal(false);
        createToast('info', 'Update Success!');
        this.formData = {};
      } else createToast('warning', 'Update Failed!');
    });
  }

  bindUpdateModal() {
    let id;
    this.table.addEventListener('click', (e) => {
      if (e.target.closest('.btn-edit')) {
        id = e.target.closest('.btn-edit').dataset.id;
        this.clearInvalid();
        this.toggleModal(true);
        this.toggleBtn(false);
        this.idModal = id;

        const data = e.target.closest('tr').querySelectorAll('td');
        this.formData = {
          id: data[0].textContent.replace(/#/g, ''),
          title: data[1].textContent,
          author: data[2].textContent,
          category: data[3].textContent,
          status: data[4].firstElementChild.classList.contains('active'),
          number: data[5].textContent,
          price: data[6].textContent.replace(/\$/g, ''),
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
    const input = this.main.querySelector('#search-box');
    input.addEventListener('keypress', (e) => {
      if (e.keyCode === 13) handel(e.target.value);
    });

    input.addEventListener('keydown', (e) => {
      if (e.keyCode === 46 || e.keyCode === 8) handel('');
    });
  }

  bindCloseToast() {
    const toast = this.app.querySelector('.notifications');
    toast.addEventListener('click', (e) => {
      if (e.target.classList.contains('ti-close')) {
        removeToast(e.target.parentNode);
      }
    });
  }

  bindUpdatePage(handel) {
    const pagination = this.app.querySelector('.pagination-wrapper');
    pagination.addEventListener('click', (e) => {
      if (e.target.nodeName === 'BUTTON') {
        const { index } = e.target.dataset;
        handel(parseInt(index, 10));
      }
    });
  }
}

export default BookView;
