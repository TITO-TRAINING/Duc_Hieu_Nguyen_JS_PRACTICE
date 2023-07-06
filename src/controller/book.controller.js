class BookController {
  constructor(bookViews, bookServices) {
    this.bookViews = bookViews;
    this.bookServices = bookServices;

    const ceil = Math.ceil(
      this.bookServices.books.length / this.bookServices.page.perPage,
    );

    // Service
    this.onDataChanged(this.bookServices.books);
    this.bookServices.bindDataChanged(this.onDataChanged);

    // View
    this.bookViews.displayPagination(ceil);
    this.bookViews.bindAddBook(this.handleAddBook);
    this.bookViews.bindDeleteBook(this.handleDeleteBook);
    this.bookViews.bindUpdateModal();
    this.bookViews.bindCloseToast();
    this.bookViews.handelToggleModal();
    this.bookViews.bindUpdateBook(this.handleUpdateBook);
    this.bookViews.bindToggleStatus(this.handelToggle);
    this.bookViews.bindSearch(this.handelSearch);
    // this.bookViews.bindIndexPage(this.handelPagination);
  }

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

  // handelPagination = (page) => {
  //   this.bookServices.updatePageIndex(page);
  // };
}

export default BookController;
