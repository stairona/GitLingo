import LessonBubble from '../components/LessonBubble.jsx'
import Icon from '../components/Icon.jsx'
import PathLine from '../components/PathLine.jsx'
import UnitGuide from '../components/UnitGuide.jsx'
import { ROW_HEIGHT, getPathOffset } from '../utils/pathLayout.js'
import unit1 from '../content/units/unit-1.json'
import upcomingUnits from '../content/upcoming-units.json'
import './Home.css'

// Decide how one lesson looks on the map.
// The first lesson you haven't finished is "current"; anything after it is "locked".
function getLessonStatus(lessonId, index, firstUnfinishedIndex, completedLessons) {
  if (completedLessons.includes(lessonId)) return 'done'
  if (index === firstUnfinishedIndex) return 'current'
  return 'locked'
}

// The home screen: the Unit 1 path, then the units that aren't ready yet.
function Home({ completedLessons, onStartLesson }) {
  const firstUnfinishedIndex = unit1.lessons.findIndex(
    (lesson) => !completedLessons.includes(lesson.id),
  )

  // The guide stands at your current lesson. Once the unit is done
  // (findIndex gave -1), it waits at the last lesson instead.
  const unitDone = firstUnfinishedIndex === -1
  const guideIndex = unitDone ? unit1.lessons.length - 1 : firstUnfinishedIndex

  return (
    <div className="home">
      <section className="unit">
        <div className="unit__banner">
          <span className="unit__label">Unit {unit1.number}</span>
          <h2 className="unit__title">{unit1.title}</h2>
        </div>

        <div className="unit__path-area">
          <PathLine count={unit1.lessons.length} reachedIndex={firstUnfinishedIndex} />
          <ol className="unit__path">
            {unit1.lessons.map((lesson, index) => {
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
                  {/* The unit's guide stands here only if this is the guide's lesson,
                      on the other side from the lesson's name. */}
                  {index === guideIndex && (
                    <UnitGuide
                      id={unit1.guide}
                      side={labelSide === 'right' ? 'left' : 'right'}
                      says={unitDone ? unit1.guideDone : lesson.says}
                      unitDone={unitDone}
                    />
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {upcomingUnits.map((unit) => (
        <section key={unit.number} className="unit unit--locked">
          <div className="unit__banner">
            <span className="unit__label">
              <Icon name="lock" size={14} /> Unit {unit.number} · Coming soon
            </span>
            <h2 className="unit__title">{unit.title}</h2>
          </div>
        </section>
      ))}
    </div>
  )
}

export default Home
