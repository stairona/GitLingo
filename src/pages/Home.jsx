import UnitPath from '../components/map/UnitPath.jsx'
import { units } from '../content/index.js'
import './Home.css'

function Home({ completedLessons, onStartLesson }) {
  return (
    <div className="home">
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
