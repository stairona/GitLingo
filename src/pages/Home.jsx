import { useEffect, useRef } from 'react'
import UnitPath from '../components/map/UnitPath.jsx'
import { units } from '../content/index.js'
import './Home.css'

function Home({ completedLessons, onStartLesson }) {
  const homeRef = useRef(null)

  // Coming back from a lesson, the map would start at the top and you'd have to scroll
  // down to find your next lesson. Instead, bring the glowing current lesson to the middle.
  // A brand new player stays at the top, and when everything is done there's no current lesson.
  // It runs each time the map opens (finishing a lesson only happens on the lesson screen).
  useEffect(() => {
    if (completedLessons.length === 0) return
    const current = homeRef.current.querySelector('.lesson-bubble--current')
    if (current) current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [completedLessons.length])

  return (
    <div className="home" ref={homeRef}>
      {units.map((unit, index) => (
        <UnitPath
          key={unit.id}
          unit={unit}
          unitIndex={index}
          completedLessons={completedLessons}
          onStartLesson={onStartLesson}
        />
      ))}
    </div>
  )
}

export default Home
