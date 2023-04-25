// eslint-disable-next-line no-unused-vars
class Book {
  constructor ({ title, author, category, status, number, price, check } = { check: false }) {
    this.__id = this.generateID()
    this.__title = title
    this.__author = author
    this.__category = category
    this.__status = status
    this.__number = number
    this.__price = price
  }

  generateID (length = 4) {
    return Math.random().toString(36).substring(2, length + 2)
  }
}
