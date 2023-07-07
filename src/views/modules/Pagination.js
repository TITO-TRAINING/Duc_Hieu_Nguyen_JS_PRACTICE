function Pagination(ceil = 1) {
  const paginationE = document.createElement('div');
  paginationE.classList.add('pagination-wrapper');

  let innerItem = '';
  for (let i = 1; i <= ceil; i += 1) {
    innerItem += `
      <li class="page-item">
        <button data-index=${i} class="page-link"> ${i}</button>
      </li>
    `;
  }

  const wrapItem = `
      <nav>
        <ul class="pagination">
          ${innerItem}
        </ul>
      </nav>
  `;

  paginationE.innerHTML += wrapItem;

  return paginationE;
}

export default Pagination;
