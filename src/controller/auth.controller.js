class AuthController {
  constructor(authView, authService) {
    this.authView = authView;
    this.authService = authService;

    this.authView.bindRegister(this.handelRegister);
    this.authView.bindLogin(this.handelLogin);
  }

  handelRegister = (user) => {
    this.authService.registerAuth(user);
  }

  handelLogin = (user) => {
    this.authService.checkAuth(user);
  }
}

export default AuthController;
