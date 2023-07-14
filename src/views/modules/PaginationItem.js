function PaginationItem(index) {
  return `
  <li class="page-item">
    <button data-index=${index} class="page-link">${index}</button>
  </li>
  `;
}

export default PaginationItem;
