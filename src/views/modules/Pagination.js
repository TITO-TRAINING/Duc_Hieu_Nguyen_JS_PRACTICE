function Pagination(ceil = 1) {
  let innerItem = '';
  for (let i = 1; i <= ceil; i += 1) {
    innerItem += `
      <li class="page-item">
        <button data-index=${i} class="page-link"> ${i}</button>
      </li>
    `;
  }

  return `
    <div class="pagination-wrapper">
      <nav>
        <ul class="pagination">
          ${innerItem}
        </ul>
      </nav>
    </div>
  `;
}

export default Pagination;
