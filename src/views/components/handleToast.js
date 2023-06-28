import Toast from './Toast';

export const removeToast = (toast) => {
  toast.classList.add('hide');
  if (toast.timeoutId) clearTimeout(toast.timeoutId);
  setTimeout(() => toast.remove(), 500);
};

export const createToast = (
  type = 'error',
  msg = 'Error: Fail to implement!',
) => {
  const toastList = document.querySelector('.notifications');

  const toast = document.createElement('li');
  toast.className = `toast ${type}`;
  toast.innerHTML = Toast(type, msg);
  toastList.appendChild(toast);
  toast.timeoutId = setTimeout(() => removeToast(toast), 3000);
};
