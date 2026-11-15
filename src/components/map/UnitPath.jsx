import LessonBubble from './LessonBubble.jsx'
import PathLine from './PathLine.jsx'
import UnitGuide from '../characters/UnitGuide.jsx'
import { ROW_HEIGHT, getPathOffset } from '../../utils/pathLayout.js'
import { getGuideNote } from '../../utils/guideNote.js'
import { getLessonStatus, isUnitUnlocked } from '../../utils/unitProgress.js'
import Icon from '../Icon.jsx'
import { CHARACTERS, UNIT_GUIDES } from '../../content/characters.js'
import './UnitPath.css'

function UnitPath({ unit, unitIndex, completedLessons, onStartLesson }) {
  const firstUnfinishedIndex = unit.lessons.findIndex(
    (lesson) => !completedLessons.includes(lesson.id),
  )

  const unlocked = isUnitUnlocked(unitIndex, completedLessons)
  const unitDone = firstUnfinishedIndex === -1
  const guideIndex = unitDone ? unit.lessons.length - 1 : firstUnfinishedIndex
  const guideId = UNIT_GUIDES[unit.id]
  const guide = CHARACTERS[guideId]

  return (
    <section id={unit.id} className={`unit${unlocked ? '' : ' unit--waiting'}`}>
      <div className="unit__banner">
        {unlocked ? (
          <span className="unit__label">Unit {unit.number}</span>
        ) : (
          <span className="unit__label">
            <Icon name="lock" size={14} /> Unit {unit.number} · Finish Unit {unit.number - 1} to unlock
          </span>
        )}
        <h2 className="unit__title">{unit.title}</h2>
      </div>

      <div className="unit__path-area">
        {/* a locked unit's line is dashed all the way, nothing walked yet */}
        <PathLine count={unit.lessons.length} reachedIndex={unlocked ? firstUnfinishedIndex : 0} />
        <ol className="unit__path">
          {unit.lessons.map((lesson, index) => {
            const status = getLessonStatus(lesson.id, index, firstUnfinishedIndex, completedLessons, unlocked)
            const labelSide = getPathOffset(index) < 0 ? 'left' : 'right'

            return (
              <li
                key={lesson.id}
                className="unit__step"
                style={{ height: ROW_HEIGHT, transform: `translateX(${getPathOffset(index)}px)` }}
              >
                <LessonBubble
                  title={lesson.title}
                  hash={lesson.hash}
                  status={status}
                  labelSide={labelSide}
                  onStart={() => onStartLesson(lesson.id)}
                />
                {index === guideIndex && (
                  <UnitGuide
                    id={guideId}
                    side={labelSide === 'right' ? 'left' : 'right'}
                    says={unitDone ? guide.done : guide.says?.[lesson.id]}
                    note={getGuideNote(unitIndex, unlocked ? guideIndex : -1)}
                    unitDone={unitDone}
                    waiting={!unlocked}
                  />
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default UnitPath
