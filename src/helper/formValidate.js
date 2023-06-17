const inputValidate = (form, name, msg = 'This input') => {
  const input = form.querySelector(`input[name=${name}]`);
  input.addEventListener('invalid', (e) => {
    if (name.includes('number') || name.includes('price')) {
      if (e.target.validity.rangeUnderflow) {
        e.target.setCustomValidity(`${msg} must be greater 0`);
      }
    } else if (e.target.validity.valueMissing) {
      e.target.setCustomValidity(`${msg} cannot be empty!`);
    }
  });

  input.addEventListener('change', (e) => {
    e.target.setCustomValidity('');
  });
};

export default inputValidate;
