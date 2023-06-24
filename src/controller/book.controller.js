class BookController {
  constructor(bookViews, bookServices) {
    this.bookViews = bookViews;
    this.bookServices = bookServices;

    // Service
    this.onDataChanged(this.bookServices.books);
    this.bookServices.bindDataChanged(this.onDataChanged);

    // View
    this.bookViews.bindAddBook(this.handleAddBook);
    this.bookViews.bindDeleteBook(this.handleDeleteBook);
    this.bookViews.bindUpdateModal();
    this.bookViews.bindUpdateBook(this.handleUpdateBook);
    this.bookViews.bindToggleStatus(this.handelToggle);
    this.bookViews.bindSearch(this.handelSearch);
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
}

export default BookController;
