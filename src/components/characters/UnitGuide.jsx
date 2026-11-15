import PixelCharacter from './PixelCharacter.jsx'
import CharacterCard from './CharacterCard.jsx'
import { CHARACTERS } from '../../content/characters.js'
import './UnitGuide.css'

function UnitGuide({ id, side, says, note, unitDone }) {
  const character = CHARACTERS[id]
  if (!character) return null

  const pose = unitDone ? 'stand' : 'point'
  const flip = side === 'right'

  return (
    <div className={`unit-guide unit-guide--${side}`}>
      {says && <p className="unit-guide__speech">{says}</p>}
      <div className="character-hover" tabIndex={0}>
        <PixelCharacter id={id} pose={pose} flip={flip} />
        <span className="unit-guide__name">{character.name}</span>
        <CharacterCard id={id} note={note} />
      </div>
    </div>
  )
}

export default UnitGuide
