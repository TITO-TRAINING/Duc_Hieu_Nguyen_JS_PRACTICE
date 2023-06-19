import generateID from '../helper/uid';

class Book {
  constructor(
    {
      id = generateID(),
      title,
      author,
      category,
      status,
      number,
      price,
      check,
    } = {
      check: false,
    },
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.category = category;
    this.status = status;
    this.number = number;
    this.price = price;
    this.check = check;
  }
}

export default Book;
