import AuthController from './controller/auth.controller';
import BookController from './controller/book.controller';
import AuthService from './services/auth.service';
import AuthView from './views/auth.view';


// new BookController(new BookService(), new BookView());
new AuthController( new AuthView(), new AuthService());
