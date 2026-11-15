import Icon from '../components/Icon.jsx'
import UnitPath from '../components/map/UnitPath.jsx'
import PixelCharacter from '../components/characters/PixelCharacter.jsx'
import CharacterCard from '../components/characters/CharacterCard.jsx'
import { getGuideNote } from '../utils/guideNote.js'
import { units } from '../content/index.js'
import { UNIT_GUIDES } from '../content/characters.js'
import './Home.css'

// The first unit is playable, the rest are still "coming soon".
const [unit1, ...upcomingUnits] = units

function Home({ completedLessons, onStartLesson }) {
  return (
    <div className="home">
      <UnitPath
        unit={unit1}
        unitIndex={0}
        completedLessons={completedLessons}
        onStartLesson={onStartLesson}
      />

      {upcomingUnits.map((unit) => (
        <section key={unit.number} id={unit.id} className="unit unit--locked">
          <div className="unit__banner">
            <span className="unit__label">
              <Icon name="lock" size={14} /> Unit {unit.number} · Coming soon
            </span>
            <h2 className="unit__title">{unit.title}</h2>
          </div>
          <div className="unit__waiting-guide character-hover" tabIndex={0}>
            <PixelCharacter id={UNIT_GUIDES[unit.id]} />
            <CharacterCard id={UNIT_GUIDES[unit.id]} note={getGuideNote(unit.number - 1, -1)} />
          </div>
        </section>
      ))}
    </div>
  )
}

export default Home
