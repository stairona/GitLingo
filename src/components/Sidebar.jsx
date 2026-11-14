import './Sidebar.css'

// The left column: our logo and the main menu.
// For now LEARN is the only page, so it is always the highlighted one.
function Sidebar() {
  return (
    <nav className="sidebar">
      {/* The moon image is decoration, so alt="" lets screen readers skip it and just read the name. */}
      <div className="sidebar__brand">
        <img className="sidebar__mark" src="/gitlingo-logo.svg" alt="" />
        <span className="sidebar__logo">GitLingo</span>
      </div>

      <ul className="sidebar__menu">
        <li>
          <span className="sidebar__item sidebar__item--active">
            <span className="sidebar__icon" aria-hidden="true">
              🏠
            </span>
            Learn
          </span>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar
