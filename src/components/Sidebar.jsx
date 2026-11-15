import Icon from './Icon.jsx'
import FunFactCharacter from './FunFactCharacter.jsx'
import { FUN_FACTS } from '../content/funFacts.js'
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
            <Icon name="home" size={28} />
            Learn
          </span>
        </li>
      </ul>

      {/* Characters hanging around the sidebar, each with a fun fact on hover. */}
      <div className="sidebar__facts">
        {FUN_FACTS.filter((fact) => fact.side === 'left').map((fact) => (
          <FunFactCharacter key={fact.id} fact={fact} cardAlign="start" />
        ))}
      </div>
    </nav>
  )
}

export default Sidebar
