import { splitCode } from '../../utils/splitCode.js'
import './CodeText.css'

// Shows a line of lesson text with anything in `backticks` in the code font,
// like "Run `git init` once per project".
function CodeText({ text }) {
  return splitCode(text).map((piece, index) =>
    piece.isCode ? (
      <code key={index} className="code-text">
        {piece.text}
      </code>
    ) : (
      <span key={index}>{piece.text}</span>
    ),
  )
}

export default CodeText
