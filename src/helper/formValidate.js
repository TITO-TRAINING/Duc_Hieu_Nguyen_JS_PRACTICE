import { createToast } from '../views/components/handleToast';

const inputValidationRules = {
  'book-title': /^[\p{L}\d\s!@#$%^&*()[\]{};:'",.<>/?\\|-]{1,100}$/u,
  'book-author': /^[\p{L}\s.&]{1,50}$/u,
  'book-category': /^[\p{L}\d\s-]{1,50}$/u,
  inputMin: 5,
};

const inputCollection = {
  'book-title': 'Title',
  'book-author': 'Author',
  'book-category': 'Category',
};

const errorMsg = {
  require: ' cannot be empty!',
  invalid: 'Please enter valid ',
  tooShort: ' must be longer than 5 characters.',
  negativeNum: 'Value must be greater than 0.',
};

const handleValidate = (input, condition, injectClass) => {
  if (condition) {
    input.classList.remove(injectClass);
  } else input.classList.add(injectClass);
};

const checkInput = (e, eventType) => {
  const inputTarget = e.target;
  const inputValue = e.target.value;
  const inputName = e.target.name;

  if (inputTarget.type === 'text') {
    switch (eventType) {
      case 'focus': {
        handleValidate(inputTarget, true, 'invalid');
        break;
      }
      case 'blur': {
        const inputValidate = inputValidationRules[inputName].test(inputValue);
        if (inputValue.length <= 0) {
          createToast('error', inputCollection[inputName] + errorMsg.require);
          handleValidate(inputTarget, false, 'invalid');
          break;
        } else if (inputValue.length < inputValidationRules.inputMin) {
          createToast('error', inputCollection[inputName] + errorMsg.tooShort);
          handleValidate(inputTarget, false, 'invalid');
          break;
        }
        if (!inputValidate) {
          createToast('error', errorMsg.invalid + inputCollection[inputName]);
          handleValidate(inputTarget, inputValidate, 'invalid');
          break;
        }
        break;
      }
      default:
        break;
    }
  } else if (inputTarget.type === 'number') {
    switch (eventType) {
      case 'focus': {
        handleValidate(inputTarget, true, 'invalid');
        break;
      }
      case 'blur': {
        const inputValidate = inputValue > 0;
        handleValidate(inputTarget, inputValidate, 'invalid');
        if (!inputValidate) {
          createToast('error', errorMsg.negativeNum);
        }
        break;
      }
      default:
        break;
    }
  }
};

const validate = (form) => {
  const textInputs = form.querySelectorAll('input');

  [...textInputs].forEach((item) => {
    item.addEventListener('blur', (e) => {
      checkInput(e, 'blur');
    });

    item.addEventListener('focus', (e) => {
      checkInput(e, 'focus');
    });
  });
};

export default validate;
