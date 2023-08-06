class AuthController {
  constructor(authView, authService, bookController, bookView, bookService) {
    this.authView = authView;
    this.authService = authService;

    this.bookController = bookController;
    this.bookView = bookView;
    this.bookService = bookService;

    this.authView.bindRegister(this.handelRegister);
    this.authView.bindLogin(this.handelLogin);
    this.checkSession();
  }

  handelRegister = (user) => {
    this.authService.registerAuth(user);
  };

  handelLogin = (user) => {
    const BookController = this.bookController;
    const BookView = this.bookView;
    const BookService = this.bookService;

    if (this.authService.checkAuth(user)) {
      new BookController(new BookService(), new BookView());
    }
  };

  checkSession = () => {
    const BookController = this.bookController;
    const BookView = this.bookView;
    const BookService = this.bookService;

    if (this.authService.isAuth) {
      new BookController(new BookService(), new BookView());
    }
  };
}

export default AuthController;
