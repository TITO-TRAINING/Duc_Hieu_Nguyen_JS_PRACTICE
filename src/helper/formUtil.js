
export function clearForm(form) {
  const inputs = form.querySelectorAll('input');
  for (const item of inputs) {
    item.value = '';
  }
}

export function collectData(form) {
  const data = {};
  const dataForm = new FormData(form);
  for (const key of dataForm.keys()) {
    const input = form.querySelector(`[name="${key}"]`);
    switch (input.type) {
      case 'number':
        data[key] = parseInt(dataForm.get(key), 10);
        break;
      case 'radio':
        data[key] = input.checked;
        break;
      default:
        data[key] = dataForm.get(key);
    }
  }
  return data;
}
