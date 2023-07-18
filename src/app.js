import BookController from './controller/book.controller';
import BookService from './services/book.service';
import BookView from './views/book.view';

new BookController(new BookService(), new BookView());
