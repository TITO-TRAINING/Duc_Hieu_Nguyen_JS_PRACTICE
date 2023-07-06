import Book from '../model/book.model';

class BookService {
  constructor() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    this.books = books.map((book) => new Book(book));
    this.page = JSON.parse(localStorage.getItem('page')) || {
      pageIndex: 1,
      perPage: 5,
    };
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

  search(key) {
    const temp = this.books.filter((book) => book.title.includes(key));
    this.onDataChanged(temp);
  }

  switchStatus(_id) {
    this.books = this.books.map((book) =>
      book.id === _id ? new Book({ ...book, status: !book.status }) : book,
    );
    this.commit(this.books);
  }

  // updatePageIndex(newPage) {
  //   const start = this.page.perPage*(newPage-1);
  //   const end = this.page.perPage*newPage;
  //   this.dataDisplay = this.books.slice(start, end);

  //   const pageInfo = {...this.page, ...{pageIndex: newPage}};
  //   localStorage.setItem('page', JSON.stringify(pageInfo));

  //   this.onDataChanged(this.dataDisplay);
  // }
}

export default BookService;
