import { useState } from 'react'
import Home from './pages/Home.jsx'
import Lesson from './pages/Lesson.jsx'
import { useProgress } from './hooks/useProgress.js'
import unit1 from './content/unit-1/unit-1.json'

// The whole app starts here. Instead of a routing library, we keep track of
// which screen to show ('home' or 'lesson') and which lesson is open.
function App() {
  const [screen, setScreen] = useState('home')
  const [openLessonId, setOpenLessonId] = useState(null)
  const { completedLessons, completeLesson } = useProgress()

  function startLesson(lessonId) {
    setOpenLessonId(lessonId)
    setScreen('lesson')
  }

  function goHome() {
    setScreen('home')
  }

  function finishLesson() {
    completeLesson(openLessonId)
    goHome()
  }

  if (screen === 'lesson') {
    const lesson = unit1.lessons.find((l) => l.id === openLessonId)
    return <Lesson lesson={lesson} onFinish={finishLesson} onBack={goHome} />
  }

  return <Home completedLessons={completedLessons} onStartLesson={startLesson} />
}

export default App
