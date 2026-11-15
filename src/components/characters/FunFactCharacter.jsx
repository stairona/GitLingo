import PixelCharacter from './PixelCharacter.jsx'
import CharacterCard from './CharacterCard.jsx'
import './FunFactCharacter.css'

function FunFactCharacter({ fact, cardAlign = 'center', cardAbove = false }) {
  return (
    <div className="fun-fact character-hover" tabIndex={0}>
      <span className="fun-fact__hint" aria-hidden="true">
        ?
      </span>
      <PixelCharacter id={fact.character} pose={fact.pose} flip={fact.flip} />
      <CharacterCard id={fact.character} label={fact.label} note={fact.text} align={cardAlign} above={cardAbove} />
    </div>
  )
}

export default FunFactCharacter
