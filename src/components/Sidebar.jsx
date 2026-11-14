import './Sidebar.css'

// The left column: our logo and the main menu.
// For now LEARN is the only page, so it is always the highlighted one.
function Sidebar() {
  return (
    <nav className="sidebar">
      <span className="sidebar__logo">GitLingo</span>

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
