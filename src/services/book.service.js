import Book from "../model/book.model";

class BookService {
  constructor() {
    const books = JSON.parse(localStorage.getItem("users")) || [];
    this.books = books.map(book => new Book(book))
  }

  commit(){
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  add(book) {
    this.users.push(new Book(book))
    this.commit()
  }

  delete(_id) {
    this.users = this.users.filter(({id}) => id !== _id)
    this.commit()
  }

  edit(_id, newBook) {
    this.users = this.users.map(book => book.id === _id ? new Book({...book, ...newBook}) : book)
    this.commit()
  }

  switchStatus(_id) {
    this.users = this.users.map(book => book.id === _id ? new Book({...book, status: !book.status}) : book)
    this.commit()
  }
}

export default BookService
