function Toast(type, msg) {
  const icons = {
    error: 'ti-na',
    info: 'ti-info-alt',
    warning: 'ti-alert',
  };

  const icon = icons[type];

  return `
      <div class="column">
        <i class="${icon}"></i>
        <span>${msg}</span>
      </div>
      <i class="ti-close"></i>
  `;
}

export default Toast;
