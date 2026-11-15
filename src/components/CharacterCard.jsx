import { CHARACTERS } from '../content/characters.js'
import './CharacterCard.css'

// The little info card that pops up when you hover over (or tab onto) a character.
// It's always in the page but hidden. The CSS shows it on hover or keyboard focus.
// Its text comes from characters.js, which comes from our lesson docs.
function CharacterCard({ id }) {
  const character = CHARACTERS[id]

  return (
    <div className="character-card" role="tooltip">
      <span className="character-card__role">{character.role}</span>
      <h3 className="character-card__name">{character.fullName}</h3>
      <p className="character-card__about">{character.about}</p>
      <dl className="character-card__facts">
        {character.facts.map((fact) => (
          <div key={fact.label} className="character-card__fact">
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default CharacterCard
