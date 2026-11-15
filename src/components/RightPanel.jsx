import FunFactCharacter from './FunFactCharacter.jsx'
import { FUN_FACTS } from '../content/funFacts.js'
import ProgressCard from './ProgressCard.jsx'
import RecentCommits from './RecentCommits.jsx'
import './RightPanel.css'

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

      <div className="right-panel__facts">
        {FUN_FACTS.filter((fact) => fact.side === 'right').map((fact) => (
          <FunFactCharacter key={fact.id} fact={fact} cardAlign="end" />
        ))}
      </div>
    </aside>
  )
}

export default RightPanel
