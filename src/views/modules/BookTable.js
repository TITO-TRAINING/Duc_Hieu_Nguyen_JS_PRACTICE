function BookTable() {
  return `
    <div class="table-title">
      <p>Table of Books </p>
    </div>
    <table>
      <thead>
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Status</th>
            <th>Number</th>
            <th>Price</th>
            <th>Action</th>
        </tr>
      </thead>
      <tbody class="book-list">

      </tbody>
    </table>
  `;
}

export default BookTable;
