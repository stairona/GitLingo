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
// labelSide ('left' or 'right') puts the name on the outside of the path's bend,
// so the line joining the lessons never runs through the text.
function LessonBubble({ title, status, labelSide, onStart }) {
  const isCurrent = status === 'current'

  return (
    <div className={`lesson-bubble lesson-bubble--${status} lesson-bubble--label-${labelSide}`}>
      {/* Fixed-height slot so every circle's center sits at the same height in its row. */}
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
        <span className="lesson-bubble__title">{title}</span>
        {isCurrent && <span className="lesson-bubble__start">Start</span>}
      </div>
    </div>
  )
}

export default LessonBubble
