import { units } from '../content/index.js'

// Small helpers about whole units, worked out from the list of finished
// lesson ids (like ["u1-l1", "u1-l2"]). Nothing new is saved.

// How many lessons in this unit are finished.
export function countFinished(unit, completedLessons) {
  return unit.lessons.filter((lesson) => completedLessons.includes(lesson.id)).length
}

// A unit opens once every lesson in the unit before it is finished.
// Unit 1 (index 0) is always open.
export function isUnitUnlocked(unitIndex, completedLessons) {
  if (unitIndex === 0) return true
  const previous = units[unitIndex - 1]
  return countFinished(previous, completedLessons) === previous.lessons.length
}

// The unit you're working on: the first unit that isn't finished yet.
// If everything is finished, it's the last unit.
export function getCurrentUnitIndex(completedLessons) {
  const index = units.findIndex(
    (unit) => countFinished(unit, completedLessons) < unit.lessons.length,
  )
  return index === -1 ? units.length - 1 : index
}
