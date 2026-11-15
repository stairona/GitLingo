// Vite's import.meta.glob loads every file that matches a pattern, so a new
// lesson is just a new file: nothing to add here by hand.
// "eager: true" loads them right away (like a normal import), and
// "import: 'default'" gives us the JSON data itself.
// The result is an object like { './units/unit-1/unit.json': { id, number, title } }.
const unitFiles = import.meta.glob('./units/unit-*/unit.json', { eager: true, import: 'default' })
const lessonFiles = import.meta.glob('./units/unit-*/lessons/lesson-*.json', {
  eager: true,
  import: 'default',
})

// Pull the number out of a file or folder name, like "lesson-10.json" -> 10.
// We sort by this number, not by the text, because as text "lesson-10"
// would come before "lesson-2".
function numberAfter(word, filePath) {
  return Number(filePath.match(new RegExp(`${word}-(\\d+)`))[1])
}

// Build one unit the same shape as before: { id, number, title, lessons: [...] }.
function buildUnit(unitPath) {
  const folder = unitPath.replace('/unit.json', '')
  const lessonPaths = Object.keys(lessonFiles)
    .filter((lessonPath) => lessonPath.startsWith(`${folder}/lessons/`))
    .sort((a, b) => numberAfter('lesson', a) - numberAfter('lesson', b))

  return { ...unitFiles[unitPath], lessons: lessonPaths.map((lessonPath) => lessonFiles[lessonPath]) }
}

// Every unit in the course, in order of its number. Adding a Unit 4 means
// adding a units/unit-4/ folder; this file doesn't change.
export const units = Object.keys(unitFiles)
  .map(buildUnit)
  .sort((a, b) => a.number - b.number)
