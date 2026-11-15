import { CHARACTERS } from '../content/characters.js'

const PIXEL = 6

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
      role="img"
      aria-label={character.name}
    >
      {/* flipping inside the svg leaves css transform free for the hover hop */}
      <g transform={flip ? `translate(${columns * PIXEL} 0) scale(-1 1)` : undefined}>{squares}</g>
    </svg>
  )
}

export default PixelCharacter
