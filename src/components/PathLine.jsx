import { ROW_HEIGHT, CIRCLE_SLOT, getPathOffset } from '../utils/pathLayout.js'
import './PathLine.css'

// The SVG is this wide, and its middle (x = 200) lines up with the middle of the path.
const WIDTH = 400
const MIDDLE = WIDTH / 2

// Build the SVG drawing instructions for a smooth line through some points.
// "M" moves to the first point. Each "C" is a curve whose two middle points pull
// the line straight down out of one circle and straight down into the next,
// which makes the S shape.
function curveThrough(points) {
  const half = ROW_HEIGHT / 2
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const from = points[i - 1]
    const to = points[i]
    d += ` C ${from.x} ${from.y + half}, ${to.x} ${to.y - half}, ${to.x} ${to.y}`
  }
  return d
}

// The curvy line behind the lesson circles, joining each one to the next.
// Like a branch in git: solid and bright up to where you are (HEAD),
// dashed and quiet for the lessons you haven't reached yet.
// reachedIndex is the current lesson's position, or -1 if every lesson is done.
function PathLine({ count, reachedIndex }) {
  // The center point of every circle, using the same numbers as the circles.
  const points = Array.from({ length: count }, (_, index) => ({
    x: MIDDLE + getPathOffset(index),
    y: index * ROW_HEIGHT + CIRCLE_SLOT / 2,
  }))

  const head = reachedIndex === -1 ? count - 1 : reachedIndex
  const travelled = points.slice(0, head + 1)
  const ahead = points.slice(head)

  return (
    <svg className="path-line" width={WIDTH} height={count * ROW_HEIGHT} aria-hidden="true">
      {ahead.length > 1 && <path className="path-line__ahead" d={curveThrough(ahead)} />}
      {travelled.length > 1 && <path className="path-line__done" d={curveThrough(travelled)} />}
    </svg>
  )
}

export default PathLine
