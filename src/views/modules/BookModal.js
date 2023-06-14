function BookModal({
  id = null,
  title = null,
  author = null,
  category = null,
  status = false,
  number = 0,
  price = 0.0,
}) {
  return `
    <div class="modal hidden">
      <div id="close-btn">
        <i class="ti-close"></i>
      </div>
      <form class="book-form">
        <input type="hidden" id="book-id" value="${id}">
        <label for="book-title">Title</label>
        <input
        type="text"
        name="book-title"
        id="book-title"
        value="${title || ''}"
        >

        <label for="book-author">Author</label>
        <input
        type="text"
        name="book-author"
        id="book-author"
        value="${author || ''}"
        >

        <label for="book-category">Category</label>
        <input
        type="text"
        name="book-category"
        id="book-category"
        value="${category || ''}"
        >

        <div class="status-wrap">
          <label for="active">Active</label>
          <input
          ${status ? 'checked' : ''}
          type="radio"
          name="book-category"
          value="active" id="active"
          class="status-btn active-btn">

          <label for="inactive">Inactive</label>
          <input
          ${!status ? 'checked' : ''}
          type="radio"
          name="book-category"
          value="inactive"
          id="inactive"
          class="status-btn inactive-btn">
        </div>


        <label for="book-number">Quantity</label>
        <input
        type="number"
        name="book-number"
        id="book-number"
        value="${number}"
        >

        <label for="book-price">Price</label>
        <input
        type="text"
        name="book-price"
        id="book-price"
        value="${price}"
        >

        <button class="save-btn">Save</button>
      </form>
    </div>`;
}

export default BookModal;