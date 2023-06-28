import { createToast } from '../views/components/handleToast';

/*
Validate input (2 section)

  1. Check value:
    a. query all input, get value => check regex : return true|| false
  2. Handle input:
    a. before return: catch blur and focus event (add class to handle css `.invalid` & make toast)

*/
const inputValidationRules = {
  'book-title': /^[a-zA-Z0-9][a-zA-Z0-9\s]{0,98}[a-zA-Z0-9]$/,
  'book-author': /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
  'book-category': /^[a-zA-Z\s-]+$/,
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
