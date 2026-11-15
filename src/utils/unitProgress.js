import { units } from '../content/index.js'

export function countFinished(unit, completedLessons) {
  return unit.lessons.filter((lesson) => completedLessons.includes(lesson.id)).length
}

// done if finished, current if it's the first unfinished one in an open unit,
// locked otherwise (every lesson of a locked unit is locked)
export function getLessonStatus(lessonId, index, firstUnfinishedIndex, completedLessons, unitUnlocked = true) {
  if (completedLessons.includes(lessonId)) return 'done'
  if (unitUnlocked && index === firstUnfinishedIndex) return 'current'
  return 'locked'
}

export function isUnitUnlocked(unitIndex, completedLessons) {
  if (unitIndex === 0) return true
  const previous = units[unitIndex - 1]
  return countFinished(previous, completedLessons) === previous.lessons.length
}

export function getCurrentUnitIndex(completedLessons) {
  const index = units.findIndex(
    (unit) => countFinished(unit, completedLessons) < unit.lessons.length,
  )
  return index === -1 ? units.length - 1 : index
}

export function findLesson(lessonId) {
  for (const unit of units) {
    const lesson = unit.lessons.find((l) => l.id === lessonId)
    if (lesson) return lesson
  }
  return undefined
}
