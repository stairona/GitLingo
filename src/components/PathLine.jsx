import { ROW_HEIGHT, CIRCLE_SLOT, getPathOffset } from '../utils/pathLayout.js'
import './PathLine.css'

// The SVG is this wide, and its middle (x = 200) lines up with the middle of the path.
const WIDTH = 400
const MIDDLE = WIDTH / 2

// The curvy line behind the lesson circles, joining each one to the next.
// It uses the same numbers as the circles, so it always passes through their centers.
function PathLine({ count }) {
  // The center point of every circle.
  const points = Array.from({ length: count }, (_, index) => ({
    x: MIDDLE + getPathOffset(index),
    y: index * ROW_HEIGHT + CIRCLE_SLOT / 2,
  }))

  // Start at the first circle, then draw a smooth S-curve to each next one.
  // "C" is a curve: the two middle points pull the line straight down out of
  // one circle and straight down into the next, which makes the S shape.
  const half = ROW_HEIGHT / 2
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const from = points[i - 1]
    const to = points[i]
    d += ` C ${from.x} ${from.y + half}, ${to.x} ${to.y - half}, ${to.x} ${to.y}`
  }

  return (
    <svg
      className="path-line"
      width={WIDTH}
      height={count * ROW_HEIGHT}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  )
}

export default PathLine
