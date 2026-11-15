import { units } from '../content/index.js'
import { CHARACTERS } from '../content/characters.js'

// The text on a guide's hover card: who they are, plus what's coming next.
//
// unitIndex: which unit the guide belongs to (0 = Unit 1)
// lessonIndex: the lesson the guide is standing at. Use -1 for a guide
//              still waiting on a locked unit, before its first lesson.
//
// The next lesson is the one right after lessonIndex. On a unit's last lesson,
// that's the first lesson of the next unit. After the very last lesson of the
// course there's nothing next, so the card shows the guide's full story instead.
export function getGuideNote(unitIndex, lessonIndex) {
  const unit = units[unitIndex]
  const character = CHARACTERS[unit.guide]

  const nextInUnit = unit.lessons[lessonIndex + 1]
  if (nextInUnit) {
    return `${character.intro} Next up: Lesson ${lessonIndex + 2}, ${nextInUnit.title}.`
  }

  const nextUnit = units[unitIndex + 1]
  if (nextUnit) {
    return `${character.intro} Next up: Unit ${nextUnit.number}, Lesson 1, ${nextUnit.lessons[0].title}.`
  }

  return character.about
}
