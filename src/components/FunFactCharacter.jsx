import PixelCharacter from './PixelCharacter.jsx'
import CharacterCard from './CharacterCard.jsx'
import './FunFactCharacter.css'

// A character standing around the edges of the page with a fun fact.
// The little "?" bubble hints that there's something to see.
// Hover over (or tab onto) them and the fact pops up in their card.
// fact: one item from content/funFacts.js
// cardAlign: where the card opens ('center' or 'start', see CharacterCard)
function FunFactCharacter({ fact, cardAlign = 'center' }) {
  return (
    <div className="fun-fact character-hover" tabIndex={0}>
      <span className="fun-fact__hint" aria-hidden="true">
        ?
      </span>
      <PixelCharacter id={fact.character} pose={fact.pose} flip={fact.flip} />
      <CharacterCard id={fact.character} label={fact.label} note={fact.text} align={cardAlign} />
    </div>
  )
}

export default FunFactCharacter
