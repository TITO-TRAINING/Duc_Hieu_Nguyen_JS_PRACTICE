function Header() {
  return `
    <div class="header-ctn" >
      <div class="menu-left">
        <div class="logo-wrapper">
          <span class="logo">HU</span>
        </div>
        <div class="menu">
          <nav>
          <div class="search-wrapper">
            <input type="text" name="search" id="search-box" placeholder="Search..">
          </div>
            <ul class="menu-list">
              <li class="nav-link">Home</li>
              <li class="nav-link">Contact</li>
              <li class="nav-link">Repo</li>
              </ul>
          </nav>
        </div>
      </div>
      <div class="menu-btn">
      <button id="add-btn">
          <i class="ti-plus"></i>
          Insert book
      </button>
      </div>
    </div>
  `;
}

export default Header;
