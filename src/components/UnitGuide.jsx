import PixelCharacter from './PixelCharacter.jsx'
import CharacterCard from './CharacterCard.jsx'
import { CHARACTERS } from '../content/characters.js'
import './UnitGuide.css'

// The unit's guide (Jackson, Charley or Lily) standing next to a lesson on the map.
// Home.jsx puts the guide beside your current lesson, so it moves down the
// path each time you finish one.
//
// id: which character ('jackson', 'charley', 'lily')
// side: which side of the circle to stand on ('left' or 'right')
// says: what the speech bubble says
// unitDone: true once every lesson in the unit is finished
function UnitGuide({ id, side, says, unitDone }) {
  const character = CHARACTERS[id]
  if (!character) return null

  // While there's a lesson to do, the guide points at it. Once the unit is done, it just stands.
  const pose = unitDone ? 'stand' : 'point'
  // The pointing picture points right. A guide standing on the right of the
  // circle has to point left, so we flip it.
  const flip = side === 'right'

  return (
    <div className={`unit-guide unit-guide--${side}`}>
      {says && <p className="unit-guide__speech">{says}</p>}
      {/* Hover over (or tab onto) the guide to see their info card. */}
      <div className="character-hover" tabIndex={0}>
        <PixelCharacter id={id} pose={pose} flip={flip} />
        <span className="unit-guide__name">{character.name}</span>
        <CharacterCard id={id} />
      </div>
    </div>
  )
}

export default UnitGuide
