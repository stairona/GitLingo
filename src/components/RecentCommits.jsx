import { findLesson } from '../utils/unitProgress.js'
import './RecentCommits.css'

// How many finished lessons to show at most.
const SHOW = 4

// Your finished lessons, shown the way `git log --oneline` shows commits:
// newest first, each with its short hash and its name.
// completedLessons is saved in the order you finished them, so the newest
// ones are at the end. We reverse it to put the newest on top.
function RecentCommits({ completedLessons }) {
  const recent = [...completedLessons]
    .reverse()
    .map(findLesson)
    .filter(Boolean) // skip any old ids that don't match a lesson anymore
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
