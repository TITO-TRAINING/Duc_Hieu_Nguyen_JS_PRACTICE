function Pagination() {
  const paginationE = document.createElement('div');
  paginationE.classList.add('pagination-wrapper');

  const wrapItem = `
      <nav>
        <ul class="pagination">
          <li class="page-item">
            <button data-index=1 class="page-link active">1</button>
          </li>
        </ul>
      </nav>
  `;

  paginationE.innerHTML += wrapItem;

  return paginationE;
}

export default Pagination;
