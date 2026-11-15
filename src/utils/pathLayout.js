export const ROW_HEIGHT = 168

export const CIRCLE_SLOT = 104

const SWING = 72

// a quarter of a sine wave per lesson gives 0, 72, 0, -72... so the path zig-zags
export function getPathOffset(index) {
  return Math.round(Math.sin((index * Math.PI) / 2) * SWING)
}
