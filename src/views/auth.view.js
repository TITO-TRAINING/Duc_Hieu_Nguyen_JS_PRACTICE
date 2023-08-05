import { collectData } from "../helper/formUtil";
import validate from "../helper/formValidate";
import LoginForm from "./modules/Auth/AuthLogin";
import RegisterForm from "./modules/Auth/AuthRegister";

class AuthView {
  constructor() {
    this.app = document.querySelector('#root');

    this.container = document.createElement('div');
    this.container.classList.add('container');

    this.toastList = document.createElement('ul');
    this.toastList.classList.add('notifications');

    this.container.innerHTML += LoginForm();
    this.container.innerHTML += RegisterForm();

    this.app.appendChild(this.toastList);
    this.app.appendChild(this.container);

    this.loginForm = document.querySelector('.login-form');
    this.registerForm = document.querySelector('.register-form');
    validate(this.loginForm);
    validate(this.registerForm);
  }

  checkValidForm(form) {
    const inputs = [...form.querySelectorAll('input')];
    return !inputs.some((input) => input.classList.contains('invalid')) && !inputs.some((input) => input.value === '');
  }

  clearInvalid() {
    const inputs = [...form.querySelectorAll('input')];
    inputs.map((input) => input.classList.remove('invalid'));
  }

  bindLogin(handel) {
    this.loginForm.addEventListener('submit', (e)=> {
      console.log('check')
      e.preventDefault();
      if(this.checkValidForm(this.loginForm)) {
        const formData = collectData(this.loginForm) ;
        handel(formData);
      }
    });
  }

  bindRegister(handel) {
    this.registerForm.addEventListener('submit', (e)=> {
      e.preventDefault();
      if(this.checkValidForm(this.registerForm)) {
        const formData = collectData(this.registerForm) ;
        handel(formData);
      }
    })
  }
}

export default AuthView;
