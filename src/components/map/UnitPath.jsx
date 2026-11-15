import LessonBubble from './LessonBubble.jsx'
import PathLine from './PathLine.jsx'
import UnitGuide from '../characters/UnitGuide.jsx'
import { ROW_HEIGHT, getPathOffset } from '../../utils/pathLayout.js'
import { getGuideNote } from '../../utils/guideNote.js'
import { getLessonStatus } from '../../utils/unitProgress.js'
import { CHARACTERS, UNIT_GUIDES } from '../../content/characters.js'
import './UnitPath.css'

function UnitPath({ unit, unitIndex, completedLessons, onStartLesson }) {
  const firstUnfinishedIndex = unit.lessons.findIndex(
    (lesson) => !completedLessons.includes(lesson.id),
  )

  const unitDone = firstUnfinishedIndex === -1
  const guideIndex = unitDone ? unit.lessons.length - 1 : firstUnfinishedIndex
  const guideId = UNIT_GUIDES[unit.id]
  const guide = CHARACTERS[guideId]

  return (
    <section id={unit.id} className="unit">
      <div className="unit__banner">
        <span className="unit__label">Unit {unit.number}</span>
        <h2 className="unit__title">{unit.title}</h2>
      </div>

      <div className="unit__path-area">
        <PathLine count={unit.lessons.length} reachedIndex={firstUnfinishedIndex} />
        <ol className="unit__path">
          {unit.lessons.map((lesson, index) => {
            const status = getLessonStatus(lesson.id, index, firstUnfinishedIndex, completedLessons)
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
                    says={unitDone ? guide.done : guide.says[lesson.id]}
                    note={getGuideNote(unitIndex, guideIndex)}
                    unitDone={unitDone}
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
