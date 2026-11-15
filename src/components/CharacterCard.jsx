import { CHARACTERS } from '../content/characters.js'
import './CharacterCard.css'

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
