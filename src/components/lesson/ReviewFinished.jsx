import Icon from '../Icon.jsx'
import './EndScreen.css'

// The end of a review. Nothing is saved, the lesson was already finished before.
function ReviewFinished({ title, onBack }) {
  return (
    <div className="end-screen">
      <div className="end-screen__badge end-screen__badge--review">
        <Icon name="check" size={56} />
      </div>
      <h1 className="end-screen__title">Review finished</h1>
      <p className="end-screen__subtitle">{title}</p>
      <p className="end-screen__note">This lesson was already done, so your progress stays the same.</p>

      <button className="lesson-button" onClick={onBack} autoFocus>
        Back to map
      </button>
    </div>
  )
}

export default ReviewFinished
