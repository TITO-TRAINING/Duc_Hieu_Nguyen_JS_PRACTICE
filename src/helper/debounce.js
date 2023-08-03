function debounce(func, duration) {
  let timer = null;

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(() => {
      func.apply(this, args);
      timer = null;
    }, duration);
  };
}

export default debounce;
