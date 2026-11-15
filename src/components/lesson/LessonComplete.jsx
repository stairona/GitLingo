import Hearts from './Hearts.jsx'
import Icon from '../Icon.jsx'
import './EndScreen.css'

// The screen after the last question. CONTINUE saves the lesson and goes back to the map.
function LessonComplete({ title, hearts, totalHearts, onContinue }) {
  const perfect = hearts === totalHearts

  return (
    <div className="end-screen">
      <div className="end-screen__badge end-screen__badge--done">
        <Icon name="check" size={56} />
      </div>
      <h1 className="end-screen__title">Lesson complete!</h1>
      <p className="end-screen__subtitle">{title}</p>

      <div className="end-screen__hearts">
        <Hearts count={hearts} total={totalHearts} />
        <span>{perfect ? 'Perfect: no hearts lost!' : `You finished with ${hearts} of ${totalHearts} hearts.`}</span>
      </div>

      <button className="lesson-button" onClick={onContinue} autoFocus>
        Continue
      </button>
    </div>
  )
}

export default LessonComplete
