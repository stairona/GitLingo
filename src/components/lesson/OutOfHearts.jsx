import Hearts from './Hearts.jsx'
import Icon from '../Icon.jsx'
import './EndScreen.css'

// The screen when the last heart is lost. TRY AGAIN starts the lesson over.
function OutOfHearts({ totalHearts, onTryAgain, onBack }) {
  return (
    <div className="end-screen">
      <div className="end-screen__badge end-screen__badge--out">
        <Icon name="heart" size={56} />
      </div>
      <h1 className="end-screen__title">Out of hearts</h1>
      <p className="end-screen__subtitle">Every mistake is how you learn Git.</p>

      <div className="end-screen__hearts">
        <Hearts count={0} total={totalHearts} />
        <span>Try the lesson again with all your hearts back.</span>
      </div>

      <div className="end-screen__actions">
        <button className="lesson-button" onClick={onTryAgain} autoFocus>
          Try again
        </button>
        <button className="lesson-link" onClick={onBack}>
          Back to map
        </button>
      </div>
    </div>
  )
}

export default OutOfHearts
