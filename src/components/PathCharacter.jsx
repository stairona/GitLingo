import PixelCharacter from './PixelCharacter.jsx'
import { CHARACTERS } from '../content/characters.js'
import './PathCharacter.css'

// The demo user standing next to a lesson on the map.
// side: which side of the circle to stand on ('left' or 'right'),
//       always the opposite side from the lesson's name.
// status: the lesson's status. Only the current lesson's character talks,
//         and characters for locked lessons are greyed out.
function PathCharacter({ user, says, side, status }) {
  // Lessons without a demo user (like Lesson 1) have user: null.
  if (!user) return null

  // "Jackson Stark" -> "jackson", which is the key in characters.js.
  const id = user.name.split(' ')[0].toLowerCase()
  if (!CHARACTERS[id]) return null

  const isCurrent = status === 'current'

  return (
    <div className={`path-character path-character--${side} path-character--${status}`}>
      {isCurrent && says && <p className="path-character__speech">{says}</p>}
      <PixelCharacter id={id} />
      <span className="path-character__name">{CHARACTERS[id].name}</span>
    </div>
  )
}

export default PathCharacter
