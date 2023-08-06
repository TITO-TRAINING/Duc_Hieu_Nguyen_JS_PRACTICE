import BookController from './controller/book.controller';
import BookView from './views/book.view';
import BookService from './services/book.service';

import AuthController from './controller/auth.controller';
import AuthService from './services/auth.service';
import AuthView from './views/auth.view';

// new BookController(new BookService(), new BookView());
new AuthController(
  new AuthView(),
  new AuthService(),
  BookController,
  BookView,
  BookService,
);
