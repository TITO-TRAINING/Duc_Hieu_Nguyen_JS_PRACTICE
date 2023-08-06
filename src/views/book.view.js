import BookTable from './modules/BookTable';
import BookModal from './modules/BookModal';
import BookItem from './modules/BookItem';
import { createToast, removeToast } from './components/handleToast';
import validate from '../helper/formValidate';
import Header from './components/Header';
import Pagination from './modules/Pagination';
import debounce from '../helper/debounce';
import { clearForm, collectData } from '../helper/formUtil';

class BookView {
  constructor() {
    this.app = document.querySelector('#root');
    this.app.innerHTML = '';
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

    this.books = [];
  }

  submitForm(handel, id) {
    const bookData = collectData(this.form);
    id ? handel(id, bookData) : handel(bookData);
  }

  displayData(books) {
    this.books = books;
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
  }

  checkValidForm() {
    const inputs = [...this.form.querySelectorAll('input')];
    return (
      !inputs.some((input) => input.classList.contains('invalid')) &&
      !inputs.some((input) => input.value === '')
    );
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
      clearForm(this.form);
    });
  }

  bindAddBook(handel) {
    const addBtn = this.form.querySelector('.save-btn');
    addBtn.addEventListener('click', () => {
      if (this.checkValidForm()) {
        this.submitForm(handel);
        clearForm(this.form);

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
        handel(parseInt(id, 10));
        createToast('info', 'Delete Success!');
      }
    });
  }

  bindUpdateBook(handel) {
    let id;
    let dataBook;

    this.table.addEventListener('click', (e) => {
      if (e.target.closest('.btn-edit')) {
        id = parseInt(e.target.closest('.btn-edit').dataset.id, 10);
        dataBook = this.books.find((item) => item.id === id);

        this.clearInvalid();
        this.toggleModal(true);
        this.toggleBtn(false);

        const bookForm = new FormData(this.form);
        const radioInputs = this.form.querySelectorAll(`input[type="radio"]`);
        for (const [key] of bookForm.entries()) {
          const input = this.form.querySelector(`input[name=${key}]`);
          switch (input.type) {
            case 'radio':
              for (const item of radioInputs) {
                item.id === 'active' ? (item.checked = dataBook[key]) : '';
                item.id === 'inactive' ? (item.checked = !dataBook[key]) : '';
              }
              break;
            default:
              input.value = dataBook[key];
          }
        }
      }
    });

    const updateBtn = this.form.querySelector('.update-btn');
    updateBtn.addEventListener('click', () => {
      if (this.checkValidForm()) {
        this.submitForm(handel, id);
        this.toggleModal(false);
        clearForm(this.form);
        createToast('info', 'Update Success!');
      } else createToast('warning', 'Update Failed!');
    });
  }

  bindToggleStatus(handel) {
    let id;
    this.table.addEventListener('click', (e) => {
      if (e.target.classList.contains('status-btn')) {
        id = e.target.getAttribute('data-id');
        handel(parseInt(id, 10));
      }
    });
  }

  bindSearch(handel) {
    const input = this.main.querySelector('#search-box');

    const onInputChange = (e) => {
      const inputValue = e.target.value;
      handel(inputValue);

      if (inputValue !== '') {
        this.pagination.firstChild.classList.add('hidden');
      } else {
        this.pagination.firstChild.classList.remove('hidden');
      }
    };

    input.addEventListener('input', debounce(onInputChange, 1500));
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
      const eventEle = e.target.closest('.page-link');
      if (eventEle && !eventEle.disabled) {
        const { index } = e.target.closest('.page-link').dataset;
        handel(parseInt(index, 10));
      }
    });
  }

  bindLogout(handel) {
    const btn = this.app.querySelector('.logout-link');
    btn.addEventListener('click', () => {
      handel();
    });
  }
}

export default BookView;
