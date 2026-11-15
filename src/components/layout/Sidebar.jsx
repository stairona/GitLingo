import Icon from '../Icon.jsx'
import FunFactCharacter from '../characters/FunFactCharacter.jsx'
import UnitSelector from './UnitSelector.jsx'
import { FUN_FACTS } from '../../content/funFacts.js'
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
        {/* the middle one stands on the right, so its card is centered on it
            (lined up with its right edge, the card would go off the left of the screen) */}
        {FUN_FACTS.map((fact, index) => (
          <FunFactCharacter key={fact.id} fact={fact} cardAlign={index === 1 ? 'center' : 'start'} cardAbove />
        ))}
      </div>
    </nav>
  )
}

export default Sidebar
