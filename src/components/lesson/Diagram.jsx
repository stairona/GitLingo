import './Diagram.css'

// A "flow" is one line of boxes joined by labeled arrows:
//   [ Your files ]  --git add-->  [ Ready to save ]
const FLOW = /^\s*\[[^\]]+\](\s*--[^>]*?-->\s*\[[^\]]+\])+\s*$/

// Draws a card's diagram. Flows become real boxes and arrows. Anything else
// (like the branch drawing in Unit 2) is hand-made text art, so it's shown
// exactly as written, in the code font, to keep its spacing.
function Diagram({ text }) {
  if (!FLOW.test(text)) {
    return <pre className="diagram diagram--text">{text}</pre>
  }

  const boxes = [...text.matchAll(/\[([^\]]+)\]/g)].map((m) => m[1].trim())
  const labels = [...text.matchAll(/--(.*?)-->/g)].map((m) => m[1].trim())

  return (
    <div className="diagram diagram--flow">
      {boxes.map((box, index) => (
        <div key={index} className="diagram__step">
          {index > 0 && (
            <div className="diagram__arrow">
              <span className="diagram__label">{labels[index - 1]}</span>
              <span className="diagram__line" aria-hidden="true">→</span>
            </div>
          )}
          <div className="diagram__box">{box}</div>
        </div>
      ))}
    </div>
  )
}

export default Diagram
