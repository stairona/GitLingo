import { units } from '../content/index.js'
import { CHARACTERS } from '../content/characters.js'

// The text on a guide's hover card, in the guide's own words:
// who they are (intro), then what you'll do next.
//
// unitIndex: which unit the guide belongs to (0 = Unit 1)
// lessonIndex: the lesson the guide is standing at. Use -1 for a guide
//              still waiting on a locked unit, before its first lesson.
//
// What comes next is written in characters.js:
// - waiting: a locked unit's guide talking about its first lesson
// - next[lessonId]: the guide talking about the lesson after this one
//   (on a unit's last lesson, that's the next unit's first lesson)
// - finale: the very last lesson of the course, when nothing comes next
export function getGuideNote(unitIndex, lessonIndex) {
  const unit = units[unitIndex]
  const character = CHARACTERS[unit.guide]

  if (lessonIndex === -1) {
    return `${character.intro} ${character.waiting}`
  }

  const lesson = unit.lessons[lessonIndex]
  const whatsNext = character.next[lesson.id] ?? character.finale
  return `${character.intro} ${whatsNext}`
}
