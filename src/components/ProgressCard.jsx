import { units } from '../content/index.js'
import { countFinished, getCurrentUnitIndex } from '../utils/unitProgress.js'
import './ProgressCard.css'

// "Your progress", laid out like a milestone on GitHub: the goal's name,
// a bar, then "% complete", how many are done and how many are still open.
// The goal is the unit you're working on now.
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
    </section>
  )
}

export default ProgressCard
