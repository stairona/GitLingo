import FunFactCharacter from './FunFactCharacter.jsx'
import { FUN_FACTS } from '../content/funFacts.js'
import ProgressCard from './ProgressCard.jsx'
import RecentCommits from './RecentCommits.jsx'
import './RightPanel.css'

// The right column: your progress, your recent "commits" (finished lessons),
// a short "how it works" card, and two fun-fact characters.
// We don't have XP or streaks, so progress is just lessons finished.
// completedLessons: the ids of every finished lesson, like ["u1-l1", "u1-l2"].
function RightPanel({ completedLessons }) {
  return (
    <aside className="right-panel">
      <ProgressCard completedLessons={completedLessons} />
      <RecentCommits completedLessons={completedLessons} />

      <section className="panel-card">
        <span className="panel-card__label">How it works</span>
        <p className="panel-card__text">
          Read a short card, answer a few questions, then type real Git commands in a safe practice
          terminal. You have 3 hearts per lesson.
        </p>
      </section>

      {/* Characters hanging around under the cards, each with a fun fact on hover.
          Their cards open toward the left so they don't go off the right edge. */}
      <div className="right-panel__facts">
        {FUN_FACTS.filter((fact) => fact.side === 'right').map((fact) => (
          <FunFactCharacter key={fact.id} fact={fact} cardAlign="end" />
        ))}
      </div>
    </aside>
  )
}

export default RightPanel
