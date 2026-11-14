// Where each lesson sits on the map. Home.jsx (the bubbles) and
// PathLine.jsx (the line joining them) both use these numbers, so they always line up.

// Every lesson row is the same height.
export const ROW_HEIGHT = 168

// The circle area at the top of each row. The circle's center is halfway down it.
export const CIRCLE_SLOT = 104

// How far each lesson moves left or right from the middle, in pixels.
// A sine wave goes 0 → right → 0 → left → 0..., so stepping a quarter of a wave
// per lesson gives 0, 72, 0, -72, 0, 72... and the path snakes down the card.
const SWING = 72

export function getPathOffset(index) {
  return Math.round(Math.sin((index * Math.PI) / 2) * SWING)
}
