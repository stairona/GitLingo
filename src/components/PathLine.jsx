import { ROW_HEIGHT, CIRCLE_SLOT, getPathOffset } from '../utils/pathLayout.js'
import './PathLine.css'

const WIDTH = 400
const MIDDLE = WIDTH / 2

function curveThrough(points) {
  const half = ROW_HEIGHT / 2
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const from = points[i - 1]
    const to = points[i]
    // the two middle points pull the line straight down out of one circle and into the next
    d += ` C ${from.x} ${from.y + half}, ${to.x} ${to.y - half}, ${to.x} ${to.y}`
  }
  return d
}

function PathLine({ count, reachedIndex }) {
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
