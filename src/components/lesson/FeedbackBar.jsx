import Icon from '../Icon.jsx'
import CodeText from './CodeText.jsx'
import './FeedbackBar.css'

// The green or red bar that replaces the bottom bar after CHECK.
// It only shows the result: Lesson.jsx decides if the answer was right
// and what happens on CONTINUE.
// "message" is the question's wrongFeedback; it's only shown when the answer is wrong.
// onBack is optional: without it there's no BACK button (like on the first screen).
function FeedbackBar({ isRight, message, onContinue, onBack }) {
  const tone = isRight ? 'right' : 'wrong'

  return (
    // role="status" makes screen readers read the result out loud when it appears.
    <footer className={`feedback-bar feedback-bar--${tone}`} role="status">
      <div className="feedback-bar__inner">
        <div className="feedback-bar__result">
          <span className="feedback-bar__icon">
            <Icon name={isRight ? 'check' : 'close'} size={28} />
          </span>
          <div>
            <h2 className="feedback-bar__title">{isRight ? 'Correct!' : 'Not quite.'}</h2>
            {!isRight && message && (
              <p className="feedback-bar__message">
                <CodeText text={message} />
              </p>
            )}
          </div>
        </div>
        <div className="feedback-bar__actions">
          {onBack && (
            <button className="lesson-back" onClick={onBack}>
              Back
            </button>
          )}
          <button className="lesson-button feedback-bar__button" onClick={onContinue} autoFocus>
            Continue
          </button>
        </div>
      </div>
    </footer>
  )
}

export default FeedbackBar
