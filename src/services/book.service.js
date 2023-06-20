import Book from '../model/book.model';

class BookService {
  constructor() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    this.books = books.map((book) => new Book(book));
  }

  bindDataChanged(callback) {
    this.onDataChanged = callback;
  }

  commit(books) {
    this.onDataChanged(books);
    localStorage.setItem('books', JSON.stringify(books));
  }

  add(book) {
    this.books.push(new Book(book));
    this.commit(this.books);
  }

  delete(_id) {
    this.books = this.books.filter(({ id }) => id !== _id);
    this.commit(this.books);
  }

  edit(_id, newBook) {
    this.books = this.books.map((book) =>
      book.id === _id ? new Book({ ...book, ...newBook }) : book,
    );
    this.commit(this.books);
  }

  switchStatus(_id) {
    this.books = this.books.map((book) =>
      book.id === _id ? new Book({ ...book, status: !book.status }) : book,
    );
    this.commit(this.books);
  }
}

export default BookService;
