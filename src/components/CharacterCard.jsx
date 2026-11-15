import { CHARACTERS } from '../content/characters.js'
import './CharacterCard.css'

// The little info card that pops up when you hover over (or tab onto) a character.
// It's always in the page but hidden. The CSS shows it on hover or keyboard focus.
// note: the story sentence to show (from utils/guideNote.js), which depends on
// where the guide is on the path.
function CharacterCard({ id, note }) {
  const character = CHARACTERS[id]

  return (
    <div className="character-card" role="tooltip">
      <span className="character-card__role">{character.role}</span>
      <h3 className="character-card__name">{character.fullName}</h3>
      <p className="character-card__about">{note}</p>
    </div>
  )
}

export default CharacterCard
