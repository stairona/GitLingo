import CodeText from './CodeText.jsx'
import './PracticeTerminal.css'

// A pretend terminal for typing Git commands. Nothing typed here ever runs:
// Lesson.jsx compares the text with the question's acceptedAnswers.
// Like MultipleChoice, it only shows things and reports what happens:
// typed is the text in the box, onType reports each change, onSubmit means "check it".
function PracticeTerminal({ question, typed, onType, onSubmit, checked }) {
  const { prompt, startingHistory = [] } = question

  // The input sits inside a <form>, so pressing Enter submits it for free.
  // preventDefault stops the browser from reloading the page, which is what a
  // form normally does when submitted.
  function handleSubmit(event) {
    event.preventDefault()
    if (!checked && typed.trim() !== '') onSubmit()
  }

  return (
    <section className="practice">
      <span className="practice__label">Terminal</span>
      <h1 className="practice__prompt">
        <CodeText text={prompt} />
      </h1>

      <div className="terminal">
        <div className="terminal__header">Practice terminal (safe)</div>

        <div className="terminal__screen">
          {/* Lines that were already typed or printed before this question,
              like a git status with a file in red. */}
          {startingHistory.map((line, index) => (
            <div key={index} className={`terminal__line terminal__line--${line.color ?? 'plain'}`}>
              {line.text}
            </div>
          ))}

          <form className="terminal__input-row" onSubmit={handleSubmit}>
            <span className="terminal__dollar" aria-hidden="true">
              $
            </span>
            <input
              className="terminal__input"
              value={typed}
              onChange={(event) => onType(event.target.value)}
              disabled={checked}
              aria-label="Type your command"
              autoFocus
              // Phones and browsers try to "help" by capitalizing, autocorrecting
              // and suggesting words. Our checker is case-sensitive, so a phone
              // turning "git" into "Git" would make a right answer wrong.
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              spellCheck={false}
            />
          </form>
        </div>
      </div>
    </section>
  )
}

export default PracticeTerminal
