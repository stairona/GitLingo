import CodeText from './CodeText.jsx'
import './MultipleChoice.css'

// Works out how one option should look.
// Before CHECK, only the picked option stands out. After CHECK, the right
// answer turns green, a wrong pick turns red, and the rest fade, so the
// player always sees the correct answer, even when they got it wrong.
function getOptionState(index, picked, correctIndex, checked) {
  if (!checked) return index === picked ? 'picked' : 'idle'
  if (index === correctIndex) return 'correct'
  if (index === picked) return 'wrong'
  return 'faded'
}

// A multiple-choice question. It only shows the options and reports clicks:
// Lesson.jsx keeps which option is picked and decides if it's right.
// picked is the chosen option's position (0, 1, 2...) or null if nothing is picked yet.
function MultipleChoice({ question, picked, onPick, checked }) {
  const { prompt, options, correctIndex } = question

  return (
    <section className="multiple-choice">
      <span className="multiple-choice__label">Multiple choice</span>
      <h1 className="multiple-choice__prompt">
        <CodeText text={prompt} />
      </h1>

      <div className="multiple-choice__options">
        {options.map((option, index) => (
          <button
            key={index}
            className={`choice choice--${getOptionState(index, picked, correctIndex, checked)}`}
            onClick={() => onPick(index)}
            // After CHECK the answer is locked in, so the options can't be clicked.
            disabled={checked}
            // Tells screen readers which option is currently chosen.
            aria-pressed={index === picked}
          >
            <span className="choice__number">{index + 1}</span>
            <span className="choice__text">
              <CodeText text={option} />
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default MultipleChoice
