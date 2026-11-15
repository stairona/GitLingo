// Our lesson text marks code with backticks, like "Run `git add .` now".
// This splits a sentence into pieces and marks which pieces are code, so a
// component can show those pieces in a code font:
//   [{ text: 'Run ', isCode: false }, { text: 'git add .', isCode: true }, { text: ' now', isCode: false }]
export function splitCode(text) {
  // Splitting on the backtick gives: outside, inside, outside, inside...
  // So every piece at an odd position (1, 3, 5...) was between two backticks.
  const pieces = text.split('`')

  return pieces
    .map((piece, index) => ({ text: piece, isCode: index % 2 === 1 }))
    // A sentence that starts or ends with code leaves an empty piece behind
    // (for example "`git push` uploads" starts with ""). Drop those.
    .filter((piece) => piece.text !== '')
}
