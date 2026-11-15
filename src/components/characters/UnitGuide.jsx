import PixelCharacter from './PixelCharacter.jsx'
import CharacterCard from './CharacterCard.jsx'
import { CHARACTERS } from '../../content/characters.js'
import './UnitGuide.css'

// waiting: the unit isn't open yet, so the guide stands in grey and doesn't talk
function UnitGuide({ id, side, says, note, unitDone, waiting = false }) {
  const character = CHARACTERS[id]
  if (!character) return null

  const pose = unitDone || waiting ? 'stand' : 'point'
  const flip = side === 'right'

  return (
    <div className={`unit-guide unit-guide--${side} unit-guide--${id}${waiting ? ' unit-guide--waiting' : ''}`}>
      {says && !waiting && <p className="unit-guide__speech">{says}</p>}
      <div className="character-hover" tabIndex={0}>
        <PixelCharacter id={id} pose={pose} flip={flip} />
        <span className="unit-guide__name">{character.name}</span>
        <CharacterCard id={id} note={note} />
      </div>
    </div>
  )
}

export default UnitGuide
