import Book from '../model/book.model';
import api from '../api/books';
import { createToast } from '../views/components/handleToast';

class BookService {
  constructor() {
    // const books = JSON.parse(localStorage.getItem('books')) || [];
    // this.books = books.map((book) => new Book(book));
    this.books = [];
    this.pageInfo = {
      data: [],
      currentPage: 1,
      perPage: 5,
    };
    this.getAllBook();
  }

  async getAllBook() {
    try {
      let { data } = await api.get('/books');
      if (data) {
        data = await data.map((book) => new Book(book));
        this.books = data;
        this.getBookOnPage();
      }
    } catch (error) {
      createToast('error', error);
    }
  }

  getBookOnPage(index = 1) {
    const start = this.pageInfo.perPage * (index - 1);
    const end = this.pageInfo.perPage * index;
    this.pageInfo.currentPage = index;
    this.pageInfo.data = this.books.slice(start, end);
    this.onDataChanged(this.pageInfo.data);
  }

  bindDataChanged(callback) {
    this.onDataChanged = callback;
  }

  commit() {
    this.getBookOnPage(this.pageInfo.currentPage);
    // this.onDataChanged(books);
    // localStorage.setItem('books', JSON.stringify(books));
  }

  async add(book) {
    try {
      const { data } = await api.post('/books', new Book(book));
      if (data) {
        this.books.push(data);
        this.commit();
      }
    } catch (error) {
      createToast('error', error);
    }
  }

  async delete(_id) {
    try {
      const { data } = await api.delete(`/books/${_id}`);
      if (data) {
        this.books = this.books.filter(({ id }) => id !== _id);
        this.commit();
      }
    } catch (error) {
      createToast('error', error);
    }
  }

  async edit(_id, newBook) {
    try {
      const { data } = await api.patch(`books/${_id}`, newBook);
      if (data) {
        this.books = this.books.map((book) =>
          book.id === _id ? new Book({ ...book, ...newBook }) : book,
        );
        this.commit();
      }
    } catch (error) {
      createToast('error', error);
    }
  }

  search(key) {
    if (key !== '') {
      const temp = this.books.filter((book) =>
        book.title.toLowerCase().includes(key.toLowerCase()),
      );
      this.onDataChanged(temp);
    } else {
      this.getBookOnPage(this.pageInfo.currentPage);
    }
  }

  async switchStatus(_id) {
    let newBook = {};
    this.books = this.books.map((book) => {
      if (book.id === _id) {
        newBook = new Book({ ...book, status: !book.status });
        return newBook;
      }
      return book;
    });
    try {
      const { data } = await api.patch(`/books/${_id}`, newBook);
      if (data) this.commit();
    } catch (error) {
      createToast('error', error);
    }
  }
}

export default BookService;
