export const titleValidate = (form, name) => {
  const input = form.querySelector(`input[name=${name}]`);
  input.addEventListener('invalid', (e) => {
    if (e.target.validity.valueMissing) {
      e.target.setCustomValidity('Title cannot be empty!');
    }
  });

  input.addEventListener('change', (e) => {
    e.target.setCustomValidity('');
  });
};

export const authorValidate = (form, name) => {
  const input = form.querySelector(`input[name=${name}]`);
  input.addEventListener('invalid', (e) => {
    if (e.target.validity.valueMissing) {
      e.target.setCustomValidity('Author cannot be empty!');
    }
  });

  input.addEventListener('change', (e) => {
    e.target.setCustomValidity('');
  });
};

export const numberValidate = (form, name) => {
  const input = form.querySelector(`input[name=${name}]`);
  input.addEventListener('invalid', (e) => {
    if (e.target.validity.rangeUnderflow) {
      e.target.setCustomValidity('Please enter a value greater 0');
    }
  });

  input.addEventListener('change', (e) => {
    e.target.setCustomValidity('');
  });
};
