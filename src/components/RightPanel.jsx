import './RightPanel.css'

// The right column: how far you are, plus a short "how it works" card.
// We don't have XP or streaks, so progress is just lessons finished.
function RightPanel({ finishedCount, totalCount }) {
  const percent = Math.round((finishedCount / totalCount) * 100)

  return (
    <aside className="right-panel">
      <section className="panel-card">
        <span className="panel-card__label">Your progress</span>
        <h3 className="panel-card__title">
          {finishedCount} / {totalCount} lessons
        </h3>
        <div className="progress" aria-label={`${percent}% of Unit 1 done`}>
          <div className="progress__fill" style={{ width: `${percent}%` }} />
        </div>
      </section>

      <section className="panel-card">
        <span className="panel-card__label">How it works</span>
        <p className="panel-card__text">
          Read a short card, answer a few questions, then type real Git commands in a safe practice
          terminal. You have 3 hearts per lesson.
        </p>
      </section>
    </aside>
  )
}

export default RightPanel
