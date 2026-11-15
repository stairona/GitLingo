import { CHARACTERS } from '../content/characters.js'

// How big one pixel of the sprite is on screen.
const PIXEL = 6

// Draws one of our pixel characters as an SVG.
// pose is 'stand' or 'point'. flip mirrors the picture, so a pointing
// character can point left instead of right.
// It walks through the sprite row by row, letter by letter, and draws a
// PIXEL x PIXEL square for every letter that isn't a dot.
function PixelCharacter({ id, pose = 'stand', flip = false }) {
  const character = CHARACTERS[id]
  const rows = character.poses[pose]
  const columns = rows[0].length

  const squares = []
  rows.forEach((row, y) => {
    row.split('').forEach((letter, x) => {
      if (letter === '.') return
      squares.push(
        <rect
          key={`${x}-${y}`}
          x={x * PIXEL}
          y={y * PIXEL}
          width={PIXEL}
          height={PIXEL}
          style={{ fill: `var(${character.colors[letter]})` }}
        />,
      )
    })
  })

  return (
    <svg
      width={columns * PIXEL}
      height={rows.length * PIXEL}
      shapeRendering="crispEdges"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      role="img"
      aria-label={character.name}
    >
      {squares}
    </svg>
  )
}

export default PixelCharacter
