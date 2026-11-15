import LessonBubble from '../components/LessonBubble.jsx'
import Icon from '../components/Icon.jsx'
import PathLine from '../components/PathLine.jsx'
import UnitGuide from '../components/UnitGuide.jsx'
import PixelCharacter from '../components/PixelCharacter.jsx'
import CharacterCard from '../components/CharacterCard.jsx'
import { ROW_HEIGHT, getPathOffset } from '../utils/pathLayout.js'
import { getGuideNote } from '../utils/guideNote.js'
import unit1 from '../content/units/unit-1.json'
import unit2 from '../content/units/unit-2.json'
import unit3 from '../content/units/unit-3.json'
import './Home.css'

// Decide how one lesson looks on the map.
// The first lesson you haven't finished is "current"; anything after it is "locked".
function getLessonStatus(lessonId, index, firstUnfinishedIndex, completedLessons) {
  if (completedLessons.includes(lessonId)) return 'done'
  if (index === firstUnfinishedIndex) return 'current'
  return 'locked'
}

// Units 2 and 3 show as locked cards for now, with their guide waiting.
const upcomingUnits = [unit2, unit3]

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
                      note={getGuideNote(0, guideIndex)}
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
          {/* The unit's guide waits in grey until the unit opens. Hover to meet them. */}
          <div className="unit__waiting-guide character-hover" tabIndex={0}>
            <PixelCharacter id={unit.guide} />
            {/* Waiting before the unit's first lesson, so lessonIndex is -1. */}
            <CharacterCard id={unit.guide} note={getGuideNote(unit.number - 1, -1)} />
          </div>
        </section>
      ))}
    </div>
  )
}

export default Home
