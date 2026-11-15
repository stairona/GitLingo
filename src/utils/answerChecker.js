// Turn what the player typed into a tidy version we can compare.
// Removes spaces at the start and end, and turns any run of spaces into one,
// so "git   add ." and "  git add . " both become "git add .".
function cleanUp(text) {
  return text.trim().replace(/\s+/g, ' ')
}

// Check a terminal answer against the question's list of accepted answers.
// This function doesn't know about units or lessons: the lesson screen passes in
// the question's acceptedAnswers, so it works the same for every unit.
//
// We do NOT ignore uppercase/lowercase on purpose. In real Git, branch names,
// file names and commit messages are case-sensitive ("Add-Dark-Mode" is a
// different branch from "add-dark-mode"), so a wrong case should count as wrong.
export function isAnswerCorrect(typed, acceptedAnswers) {
  const cleanTyped = cleanUp(typed)
  return acceptedAnswers.some((answer) => cleanUp(answer) === cleanTyped)
}
