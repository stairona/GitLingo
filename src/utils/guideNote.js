import { units } from '../content/index.js'
import { CHARACTERS } from '../content/characters.js'

// lessonIndex is -1 for a guide still waiting on a locked unit
export function getGuideNote(unitIndex, lessonIndex) {
  const unit = units[unitIndex]
  const character = CHARACTERS[unit.guide]

  if (lessonIndex === -1) {
    const first = unit.lessons[0]
    return `${character.intro} First up, Lesson 1 (${first.title}): ${character.waiting}`
  }

  const lesson = unit.lessons[lessonIndex]
  const whatsNext = character.next[lesson.id]

  const nextInUnit = unit.lessons[lessonIndex + 1]
  if (nextInUnit) {
    return `${character.intro} Next up, Lesson ${lessonIndex + 2} (${nextInUnit.title}): ${whatsNext}`
  }

  const nextUnit = units[unitIndex + 1]
  if (nextUnit) {
    return `${character.intro} That's Unit ${unit.number}! Next up, Unit ${nextUnit.number}, Lesson 1 (${nextUnit.lessons[0].title}): ${whatsNext}`
  }

  return `${character.intro} ${character.finale}`
}
