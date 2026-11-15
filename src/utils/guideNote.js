import { units } from '../content/index.js'
import { CHARACTERS } from '../content/characters.js'

// The text on a guide's hover card, in the guide's own words:
// who they are (intro), then which lesson comes next and what you'll do there.
//
// unitIndex: which unit the guide belongs to (0 = Unit 1)
// lessonIndex: the lesson the guide is standing at. Use -1 for a guide
//              still waiting on a locked unit, before its first lesson.
//
// The next lesson is named on purpose ("Lesson 3 (Main commands)"), because
// some lessons star Charley or Lily, who also guide later units. Naming the
// lesson makes it clear we mean the next lesson, not the next unit.
export function getGuideNote(unitIndex, lessonIndex) {
  const unit = units[unitIndex]
  const character = CHARACTERS[unit.guide]

  // Waiting on a locked unit: talk about the unit's first lesson.
  if (lessonIndex === -1) {
    const first = unit.lessons[0]
    return `${character.intro} First up, Lesson 1 (${first.title}): ${character.waiting}`
  }

  const lesson = unit.lessons[lessonIndex]
  const whatsNext = character.next[lesson.id]

  // The next lesson in the same unit.
  const nextInUnit = unit.lessons[lessonIndex + 1]
  if (nextInUnit) {
    return `${character.intro} Next up, Lesson ${lessonIndex + 2} (${nextInUnit.title}): ${whatsNext}`
  }

  // Last lesson of the unit: the next lesson is Lesson 1 of the next unit.
  const nextUnit = units[unitIndex + 1]
  if (nextUnit) {
    return `${character.intro} That's Unit ${unit.number}! Next up, Unit ${nextUnit.number}, Lesson 1 (${nextUnit.lessons[0].title}): ${whatsNext}`
  }

  // The very last lesson of the course: nothing comes next.
  return `${character.intro} ${character.finale}`
}
