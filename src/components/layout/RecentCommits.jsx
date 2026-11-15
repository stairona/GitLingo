import { findLesson } from '../../utils/unitProgress.js'
import './RecentCommits.css'

const SHOW = 4

function RecentCommits({ completedLessons }) {
  const recent = [...completedLessons]
    .reverse() // on a copy, so the saved list keeps its order
    .map(findLesson)
    .filter(Boolean)
    .slice(0, SHOW)

  return (
    <section className="panel-card recent-commits">
      <span className="panel-card__label">Recent commits</span>
      <div className="recent-commits__terminal">
        <code className="recent-commits__prompt">$ git log --oneline</code>
        {recent.length === 0 ? (
          <p className="recent-commits__empty">No commits yet. Finish a lesson to make your first one.</p>
        ) : (
          <ol className="recent-commits__list">
            {recent.map((lesson) => (
              <li key={lesson.id} className="recent-commits__row">
                <code className="recent-commits__hash">{lesson.hash}</code>
                <span className="recent-commits__title">{lesson.title}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  )
}

export default RecentCommits
