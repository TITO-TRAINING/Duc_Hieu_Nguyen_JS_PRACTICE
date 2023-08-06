import AuthController from "./auth.controller";
import AuthService from '../services/auth.service';
import AuthView from '../views/auth.view';

class BookController {
  constructor(bookServices, bookViews) {
    this.bookServices = bookServices;
    this.bookViews = bookViews;

    // Service
    this.bookServices.bindDataChanged(this.onDataChanged);
    // this.bookViews.displayPagination(1, 1);

    // View
    this.bookViews.bindAddBook(this.handleAddBook);
    this.bookViews.bindDeleteBook(this.handleDeleteBook);
    this.bookViews.bindCloseToast();
    this.bookViews.handelToggleModal();
    this.bookViews.bindUpdateBook(this.handleUpdateBook);
    this.bookViews.bindToggleStatus(this.handelToggle);
    this.bookViews.bindSearch(this.handelSearch);
    this.bookViews.bindUpdatePage(this.handlePaginate);
    this.bookViews.bindLogout(this.handelLogout);
  }

  onDataChanged = (books) => {
    this.bookViews.displayData(books);

    const ceil = Math.ceil(
      this.bookServices.books.length / this.bookServices.pageInfo.perPage,
    );

    this.bookViews.displayPagination(
      ceil,
      this.bookServices.pageInfo.currentPage,
    );
  };

  handlePaginate = (pageIndex) => {
    this.bookServices.getBookOnPage(pageIndex);
  };

  handleAddBook = (book) => {
    this.bookServices.add(book);
  };

  handleDeleteBook = (id) => {
    this.bookServices.delete(id);
  };

  handleUpdateBook = (id, book) => {
    this.bookServices.edit(id, book);
  };

  handelToggle = (id) => {
    this.bookServices.switchStatus(id);
  };

  handelSearch = (key) => {
    this.bookServices.search(key);
  };

  handelLogout = () => {
    const BookView = this.bookViews;
    const BookService = this.bookServices;

    localStorage.setItem('isAuth', false);
    new AuthController(
      new AuthView(),
      new AuthService(),
      BookController,
      BookView,
      BookService,
    );
  };
}

export default BookController;
