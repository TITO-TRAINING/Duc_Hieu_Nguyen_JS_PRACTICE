function Pagination(totalPage, cp = 1) {
  const paginationE = document.createElement('div');
  paginationE.classList.add('pagination-wrapper');

  const wrapItem = `
      <nav>
        <ul class="pagination">
          <li class="page-item">
            <button data-index=${cp - 1} class="page-link ${
    cp > 1 && 'active'
  }" ${cp <= 1 && 'disabled'}>
              <i class="ti-angle-double-left"></i>
            </button>
          </li>

          <li class="page-item">
            <button data-index=${cp} class="page-link active"> ${cp}</button>
          </li>

          <li class="page-item">
            <button data-index=${cp + 1} class="page-link ${
    cp < totalPage && 'active'
  }" ${cp >= totalPage && 'disabled'}>
              <i class="ti-angle-double-right"></i>
            </button>
          </li>
        </ul>
      </nav>
  `;

  paginationE.innerHTML += wrapItem;

  return paginationE;
}

export default Pagination;
