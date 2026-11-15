import Icon from '../components/Icon.jsx'
import UnitPath from '../components/map/UnitPath.jsx'
import PixelCharacter from '../components/characters/PixelCharacter.jsx'
import CharacterCard from '../components/characters/CharacterCard.jsx'
import { getGuideNote } from '../utils/guideNote.js'
import { units } from '../content/index.js'
import { UNIT_GUIDES } from '../content/characters.js'
import './Home.css'

// Units 1 and 2 are drawn as paths. Unit 3 is still a "coming soon" card for now.
const pathUnits = units.slice(0, 2)
const upcomingUnits = units.slice(2)

function Home({ completedLessons, onStartLesson }) {
  return (
    <div className="home">
      {pathUnits.map((unit, index) => (
        <UnitPath
          key={unit.id}
          unit={unit}
          unitIndex={index}
          completedLessons={completedLessons}
          onStartLesson={onStartLesson}
        />
      ))}

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
