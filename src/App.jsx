import Home from './pages/Home.jsx'
import { useProgress } from './hooks/useProgress.js'

// The whole app starts here. For now it only shows the Home map.
function App() {
  const { completedLessons } = useProgress()

  // Opening a lesson comes in the next step, so clicking does nothing yet.
  return <Home completedLessons={completedLessons} onStartLesson={() => {}} />
}

export default App
