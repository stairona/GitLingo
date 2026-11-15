import { units } from '../../content/index.js'
import { countFinished, getCurrentUnitIndex } from '../../utils/unitProgress.js'
import './ProgressCard.css'

function ProgressCard({ completedLessons }) {
  const unit = units[getCurrentUnitIndex(completedLessons)]
  const done = countFinished(unit, completedLessons)
  const open = unit.lessons.length - done
  const percent = Math.round((done / unit.lessons.length) * 100)

  return (
    <section className="panel-card progress-card">
      <span className="panel-card__label">Your progress</span>
      <h3 className="progress-card__title">
        Unit {unit.number}: {unit.title}
      </h3>

      <div className="progress" aria-label={`${percent}% of Unit ${unit.number} done`}>
        <div className="progress__fill" style={{ width: `${percent}%` }} />
      </div>

      <p className="progress-card__meta">
        <span>
          <strong>{percent}%</strong> complete
        </span>
        <span>
          <strong>{done}</strong> done
        </span>
        <span>
          <strong>{open}</strong> open
        </span>
      </p>

      <span className="progress-card__course-label">Whole course</span>
      <div className="course-bar">
        {units.map((u) => (
          <div
            key={u.id}
            className={`course-bar__unit course-bar__unit--${u.number}`}
            style={{ flex: u.lessons.length }}
          >
            <div
              className="course-bar__fill"
              style={{ width: `${(countFinished(u, completedLessons) / u.lessons.length) * 100}%` }}
            />
          </div>
        ))}
      </div>
      <ul className="course-bar__legend">
        {units.map((u) => (
          <li key={u.id} className={`course-bar__key course-bar__key--${u.number}`}>
            Unit {u.number}{' '}
            <code>
              {countFinished(u, completedLessons)}/{u.lessons.length}
            </code>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProgressCard
