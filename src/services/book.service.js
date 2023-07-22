import Book from '../model/book.model';
import api from '../api/books';
import { createToast } from '../views/components/handleToast';

class BookService {
  constructor() {
    // const books = JSON.parse(localStorage.getItem('books')) || [];
    // this.books = books.map((book) => new Book(book));
    this.books = [];
    this.pageInfo = {
      currentPage: 1,
      perPage: 5,
    };
    this.getBookBookOnPage();
  }

  async getAllBook() {
    try {
      let { data } = await api.get('/books');
      if (data) {
        data = await data.map((book) => new Book(book));
        this.books = data;
        this.onDataChanged(this.books);
      }
    } catch (error) {
      createToast('error', error);
    }
  }

  async getBookBookOnPage(index = 1) {
    try {
      let { data } = await api.get(
        `/books?_page=${index}/&_limit=${this.pageInfo.perPage}`,
      );
      if (data) {
        this.pageInfo.currentPage = index;
        data = await data.map((book) => new Book(book));
        this.books = data;
        this.onDataChanged(this.books);
      }
    } catch (error) {
      createToast('error', error);
    }
  }

  bindDataChanged(callback) {
    this.onDataChanged = callback;
  }

  commit(books) {
    this.onDataChanged(books);
    // localStorage.setItem('books', JSON.stringify(books));
  }

  async add(book) {
    try {
      const { data } = await api.post('/books', new Book(book));
      if (data) {
        this.books.push(new Book(book));
        this.commit(this.books);
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
        this.commit(this.books);
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
        this.commit(this.books);
      }
    } catch (error) {
      createToast('error', error);
    }
  }

  search(key) {
    const temp = this.books.filter((book) =>
      book.title.toLowerCase().includes(key.toLowerCase()),
    );
    this.onDataChanged(temp);
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
      if (data) this.commit(this.books);
    } catch (error) {
      createToast('error', error);
    }
  }
}

export default BookService;
