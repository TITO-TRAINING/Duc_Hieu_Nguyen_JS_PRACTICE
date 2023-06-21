import BookController from './controller/book.controller';
import BookService from './services/book.service';
import BookView from './views/book.view';

// eslint-disable-next-line no-unused-vars
const app = new BookController(new BookView(), new BookService());
