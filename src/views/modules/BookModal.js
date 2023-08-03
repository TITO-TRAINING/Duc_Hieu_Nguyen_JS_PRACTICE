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
      <form class="book-form" action="javascript:void(0)">
        <input type="hidden" id="book-id" value="${id}">
        <label for="book-title">Title</label>
        <input
        type="text"
        name="title"
        id="book-title"
        maxlength="100"
        value="${title || ''}"
        >

        <label for="book-author">Author</label>
        <input
        type="text"
        name="author"
        id="book-author"
        maxlength="50"
        value="${author || ''}"
        >

        <label for="book-category">Category</label>
        <input
        type="text"
        name="category"
        id="book-category"
        maxlength="30"
        value="${category || ''}"
        >

        <div class="status-wrap">
          <label for="active">Active</label>
          <input
          ${status ? 'checked' : ''}
          type="radio"
          name="status"
          value="active" id="active"
          class="status-btn active-btn">

          <label for="inactive">Inactive</label>
          <input
          ${!status ? 'checked' : ''}
          type="radio"
          name="status"
          value="inactive"
          id="inactive"
          class="status-btn inactive-btn">
        </div>


        <label for="book-number">Quantity</label>
        <input
        type="number"
        name="number"
        id="book-number"
        min="1"
        value="${number}"
        >

        <label for="book-price">Price</label>
        <input
        type="number"
        name="price"
        id="book-price"
        step="any"
        min="1"
        value="${price}"
        >

        <button class="save-btn" type="submit">Save</button>
        <button class="update-btn hidden">Update</button>
      </form>
    </div>`;
}

export default BookModal;
