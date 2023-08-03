// eslint-disable-next-line import/prefer-default-export
export function clearForm(form) {
  const inputs = form.querySelectorAll('input');
  for (const item of inputs) {
    item.value = '';
  }
}

export function collectData(form) {
  const data = {};
  const bookForm = new FormData(form);
  for (const key of bookForm.keys()) {
    const input = form.querySelector(`[name="${key}"]`);
    switch (input.type) {
      case 'number':
        data[key] = parseInt(bookForm.get(key), 10);
        break;
      case 'radio':
        data[key] = input.checked;
        break;
      default:
        data[key] = bookForm.get(key);
    }
  }
  return data;
}
