import Book from '../model/book.model';

class BookService {
  constructor() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    this.books = books.map((book) => new Book(book));
  }

  commit() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  add(book) {
    this.books.push(new Book(book));
    this.commit();
  }

  delete(_id) {
    this.books = this.books.filter(({ id }) => id !== _id);
    this.commit();
  }

  edit(_id, newBook) {
    this.books = this.books.map((book) =>
      book.id === _id ? new Book({ ...book, ...newBook }) : book,
    );
    this.commit();
  }

  switchStatus(_id) {
    this.books = this.books.map((book) =>
      book.id === _id ? new Book({ ...book, status: !book.status }) : book,
    );
    this.commit();
  }
}

export default BookService;
