import Book from '../model/book.model';

class BookService {
  constructor() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    this.books = books.map((book) => new Book(book));
    this.page = JSON.parse(localStorage.getItem('page')) || {
      pageIndex: 1,
      perPage: 5,
    };

    this.page.pageIndex = 1;

    this.pageStart = this.page.perPage * (this.page.pageIndex - 1);
    this.pageEnd = this.page.perPage * this.page.pageIndex;
    this.pageData = this.books.slice(this.pageStart, this.pageEnd);
    this.ceil = Math.ceil(this.books.length / this.page.perPage);
  }

  bindDataChanged(callback) {
    this.onDataChanged = callback;
  }

  commit(books) {
    const pageData = books.slice(this.pageStart, this.pageEnd);
    this.onDataChanged(pageData);
    this.updatePageIndex(this.page.pageIndex);
    localStorage.setItem('books', JSON.stringify(books));
  }

  add(book) {
    this.books.push(new Book(book));
    this.commit(this.books);
    this.updatePagination();
    this.updatePageIndex(this.ceil);
  }

  delete(_id) {
    this.books = this.books.filter(({ id }) => id !== _id);
    this.commit(this.books);
    this.updatePagination();
  }

  edit(_id, newBook) {
    this.books = this.books.map((book) =>
      book.id === _id ? new Book({ ...book, ...newBook }) : book,
    );
    this.commit(this.books);
    this.updatePagination();
  }

  search(key) {
    const temp = this.books
      .filter((book) => book.title.includes(key))
      .slice(0, this.page.perPage);
    this.onDataChanged(temp);
  }

  switchStatus(_id) {
    this.books = this.books.map((book) =>
      book.id === _id ? new Book({ ...book, status: !book.status }) : book,
    );
    this.commit(this.books);
  }

  updatePageIndex(newPage = 1) {
    const start = this.page.perPage * (newPage - 1);
    const end = this.page.perPage * newPage;
    this.pageData = this.books.slice(start, end);

    this.page = { ...this.page, ...{ pageIndex: newPage } };
    localStorage.setItem('page', JSON.stringify(this.page));

    this.onDataChanged(this.pageData);
  }

  updatePagination() {
    this.ceil = Math.ceil(this.books.length / this.page.perPage);
    this.pageStart = this.page.perPage * (this.page.pageIndex - 1);
    this.pageEnd = this.page.perPage * this.page.pageIndex;
    this.pageData = this.books.slice(this.pageStart, this.pageEnd);
  }
}

export default BookService;
