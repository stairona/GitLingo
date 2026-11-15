import Icon from './Icon.jsx'
import FunFactCharacter from './FunFactCharacter.jsx'
import UnitSelector from './UnitSelector.jsx'
import { FUN_FACTS } from '../content/funFacts.js'
import './Sidebar.css'

function Sidebar({ completedLessons }) {
  return (
    <nav className="sidebar">
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

      <UnitSelector completedLessons={completedLessons} />

      <div className="sidebar__facts">
        {FUN_FACTS.filter((fact) => fact.side === 'left').map((fact) => (
          <FunFactCharacter key={fact.id} fact={fact} cardAlign="start" />
        ))}
      </div>
    </nav>
  )
}

export default Sidebar
