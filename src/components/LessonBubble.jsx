import Icon from './Icon.jsx'
import './LessonBubble.css'

// Which icon each status shows inside the circle.
const ICONS = {
  done: 'check',
  current: 'star',
  locked: 'lock',
}

// One round lesson button on the map.
// status is 'done', 'current' or 'locked'. Only the current lesson can be clicked.
function LessonBubble({ title, status, onStart }) {
  const isCurrent = status === 'current'

  return (
    <div className={`lesson-bubble lesson-bubble--${status}`}>
      <button
        className="lesson-bubble__circle"
        onClick={onStart}
        disabled={!isCurrent}
        aria-label={`${title} (${status})`}
      >
        <Icon name={ICONS[status]} size={isCurrent ? 40 : 28} />
      </button>
      <span className="lesson-bubble__title">{title}</span>
      {isCurrent && <span className="lesson-bubble__start">Start</span>}
    </div>
  )
}

export default LessonBubble
