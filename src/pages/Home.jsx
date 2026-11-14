import LessonBubble from '../components/LessonBubble.jsx'
import Icon from '../components/Icon.jsx'
import PathLine from '../components/PathLine.jsx'
import { ROW_HEIGHT, getPathOffset } from '../utils/pathLayout.js'
import unit1 from '../content/unit-1/unit-1.json'
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
          {unit1.lessons.map((lesson, index) => (
            <li
              key={lesson.id}
              className="unit__step"
              style={{ height: ROW_HEIGHT, transform: `translateX(${getPathOffset(index)}px)` }}
            >
              <LessonBubble
                title={lesson.title}
                hash={lesson.hash}
                status={getLessonStatus(lesson.id, index, firstUnfinishedIndex, completedLessons)}
                labelSide={getPathOffset(index) < 0 ? 'left' : 'right'}
                onStart={() => onStartLesson(lesson.id)}
              />
            </li>
          ))}
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
