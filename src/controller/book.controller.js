class BookController {
  constructor(bookViews, bookServices) {
    this.bookViews = bookViews;
    this.bookServices = bookServices;
    // Service
    this.onDataChanged(this.bookServices.books);
    this.bookServices.bindDataChanged(this.onDataChanged);

    this.onRenderPagination(this.bookServices.ceil);
    // View
    this.bookViews.bindAddBook(this.handleAddBook);
    this.bookViews.bindDeleteBook(this.handleDeleteBook);
    this.bookViews.bindUpdateModal();
    this.bookViews.bindCloseToast();
    this.bookViews.handelToggleModal();
    this.bookViews.bindUpdateBook(this.handleUpdateBook);
    this.bookViews.bindToggleStatus(this.handelToggle);
    this.bookViews.bindSearch(this.handelSearch);
    this.bookViews.bindIndexPage(this.handelPagination);
  }

  onRenderPagination = (ceil) => {
    this.bookViews.displayPagination(ceil);
  };

  onDataChanged = (books) => {
    this.bookViews.displayData(books);
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

  handelPagination = (page) => {
    this.bookServices.updatePageIndex(page);
  };
}

export default BookController;
