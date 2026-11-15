import Icon from '../Icon.jsx'
import './LessonBubble.css'

const ICONS = {
  done: 'check',
  current: 'star',
  locked: 'lock',
}

function LessonBubble({ title, hash, status, labelSide, onStart }) {
  const isCurrent = status === 'current'
  const showHash = status !== 'locked'

  return (
    <div className={`lesson-bubble lesson-bubble--${status} lesson-bubble--label-${labelSide}`}>
      <div className="lesson-bubble__slot">
        <button
          className="lesson-bubble__circle"
          onClick={onStart}
          disabled={!isCurrent}
          aria-label={`${title} (${status})`}
        >
          <Icon name={ICONS[status]} size={isCurrent ? 40 : 28} />
        </button>
      </div>
      <div className="lesson-bubble__label">
        {showHash && (
          <div className="lesson-bubble__ref">
            <code className="lesson-bubble__hash">{hash}</code>
            {isCurrent && <code className="lesson-bubble__head">HEAD -&gt; main</code>}
          </div>
        )}
        <span className="lesson-bubble__title">{title}</span>
        {isCurrent && <span className="lesson-bubble__start">Start</span>}
      </div>
    </div>
  )
}

export default LessonBubble
