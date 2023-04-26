// eslint-disable-next-line no-unused-vars
class Book {
  constructor(
    { title, author, category, status, number, price, check } = { check: false }
  ) {
    this.id = this.generateID();
    this.title = title;
    this.author = author;
    this.category = category;
    this.status = status;
    this.number = number;
    this.price = price;
    this.check = check;
  }

  // eslint-disable-next-line class-methods-use-this
  generateID(length = 4) {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  }
}
