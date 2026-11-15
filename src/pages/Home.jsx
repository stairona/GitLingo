import LessonBubble from '../components/LessonBubble.jsx'
import Icon from '../components/Icon.jsx'
import PathLine from '../components/PathLine.jsx'
import UnitGuide from '../components/UnitGuide.jsx'
import PixelCharacter from '../components/PixelCharacter.jsx'
import CharacterCard from '../components/CharacterCard.jsx'
import { ROW_HEIGHT, getPathOffset } from '../utils/pathLayout.js'
import { getGuideNote } from '../utils/guideNote.js'
import { units } from '../content/index.js'
import { CHARACTERS, UNIT_GUIDES } from '../content/characters.js'
import './Home.css'

function getLessonStatus(lessonId, index, firstUnfinishedIndex, completedLessons) {
  if (completedLessons.includes(lessonId)) return 'done'
  if (index === firstUnfinishedIndex) return 'current'
  return 'locked'
}

// The first unit is playable, the rest are still "coming soon".
const [unit1, ...upcomingUnits] = units

function Home({ completedLessons, onStartLesson }) {
  const firstUnfinishedIndex = unit1.lessons.findIndex(
    (lesson) => !completedLessons.includes(lesson.id),
  )

  const unitDone = firstUnfinishedIndex === -1
  const guideIndex = unitDone ? unit1.lessons.length - 1 : firstUnfinishedIndex
  const guideId = UNIT_GUIDES[unit1.id]
  const guide = CHARACTERS[guideId]

  return (
    <div className="home">
      <section id={unit1.id} className="unit">
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
                  {index === guideIndex && (
                    <UnitGuide
                      id={guideId}
                      side={labelSide === 'right' ? 'left' : 'right'}
                      says={unitDone ? guide.done : guide.says[lesson.id]}
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
        <section key={unit.number} id={unit.id} className="unit unit--locked">
          <div className="unit__banner">
            <span className="unit__label">
              <Icon name="lock" size={14} /> Unit {unit.number} · Coming soon
            </span>
            <h2 className="unit__title">{unit.title}</h2>
          </div>
          <div className="unit__waiting-guide character-hover" tabIndex={0}>
            <PixelCharacter id={UNIT_GUIDES[unit.id]} />
            <CharacterCard id={UNIT_GUIDES[unit.id]} note={getGuideNote(unit.number - 1, -1)} />
          </div>
        </section>
      ))}
    </div>
  )
}

export default Home
