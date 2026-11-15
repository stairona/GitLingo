import { CHARACTERS } from '../content/characters.js'
import './CharacterCard.css'

// The little info card that pops up when you hover over (or tab onto) a character.
// It's always in the page but hidden. The CSS shows it on hover or keyboard focus.
// note: the text to show, like a guide's story (utils/guideNote.js) or a fun fact.
// label: the small purple line on top. Defaults to the character's role ("Unit 1 guide").
// align: 'center' (under the character) or 'start' (starts at the character's left
//        edge, for characters near the left side of the screen so the card stays on screen).
function CharacterCard({ id, note, label, align = 'center' }) {
  const character = CHARACTERS[id]

  return (
    <div className={`character-card character-card--${align}`} role="tooltip">
      <span className="character-card__role">{label ?? character.role}</span>
      <h3 className="character-card__name">{character.fullName}</h3>
      <p className="character-card__about">{note}</p>
    </div>
  )
}

export default CharacterCard
