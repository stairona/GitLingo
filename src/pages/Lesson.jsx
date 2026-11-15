import './Lesson.css'

function Lesson({ lesson, onFinish, onBack }) {
  return (
    <div className="lesson">
      <span className="lesson__label">Lesson</span>
      <h1 className="lesson__title">{lesson.title}</h1>
      <p className="lesson__text">The real lesson is coming soon.</p>

      <div className="lesson__actions">
        <button className="lesson__button" onClick={onFinish}>
          Finish lesson (test)
        </button>
        <button className="lesson__link" onClick={onBack}>
          Back to map
        </button>
      </div>
    </div>
  )
}

export default Lesson
