function BookItem({ id, title, author, category, status, number, price }) {
  return `
  <tr>
    <td>#${id}</td>
    <td>${title}</td>
    <td>${author}</td>
    <td>${category}</td>
    <td>
      <button class="status-btn ${
        status ? 'active' : 'inactive'
      }" data-id="${id}">
      ${status ? 'Active' : 'Inactive'}
      </button>
    </td>
    <td>${number}</td>
    <td>$${price}</td>
    <td>
      <button class="action-btn btn-edit" data-id="${id}">
        <i class="ti-pencil-alt edit-icon" ></i>
      </button>

      <button class="action-btn btn-delete delete-icon" data-id="${id}">
        <i class="ti-trash"></i>
      </button>
    </td>
  </tr>
  `;
}

export default BookItem;
