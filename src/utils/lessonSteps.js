// Turn one lesson from the JSON into a single list of screens, in the order
// the player sees them: the welcome card, then the teaching cards, then the questions.
//
// Each screen gets a "kind" label, so the lesson screen knows what to draw
// without guessing from the shape of the data.
export function getLessonSteps(lesson) {
  const steps = []

  // Only lessons with a demo user have a welcome card. Unit 1 Lesson 1 has
  // "user": null, so it skips straight to the first teaching card.
  if (lesson.user) {
    steps.push({ kind: 'welcome', user: lesson.user })
  }

  // "...card" copies all the card's fields (title, body, bullets...) into the new
  // object, and then we add the kind label next to them.
  for (const card of lesson.cards) {
    steps.push({ kind: 'card', ...card })
  }

  // Questions keep their own "type" field ("multiple-choice" or "terminal"),
  // which the question screen uses to pick between the two.
  for (const question of lesson.questions) {
    steps.push({ kind: 'question', ...question })
  }

  return steps
}
