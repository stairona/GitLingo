import { CHARACTERS } from '../../content/characters.js'
import './CharacterCard.css'

// above: open the card over the character instead of under it
function CharacterCard({ id, note, label, align = 'center', above = false }) {
  const character = CHARACTERS[id]

  return (
    <div className={`character-card character-card--${align}${above ? ' character-card--above' : ''}`} role="tooltip">
      <span className="character-card__role">{label ?? character.role}</span>
      <h3 className="character-card__name">{character.fullName}</h3>
      <p className="character-card__about">{note}</p>
    </div>
  )
}

export default CharacterCard
