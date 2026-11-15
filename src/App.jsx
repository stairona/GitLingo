import { useState } from 'react'
import Home from './pages/Home.jsx'
import Lesson from './pages/Lesson.jsx'
import AppFrame from './components/layout/AppFrame.jsx'
import { useProgress } from './hooks/useProgress.js'
import { units } from './content/index.js'

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
    // Search every unit, so a Unit 2 or 3 lesson can open too, not just Unit 1.
    const allLessons = units.flatMap((unit) => unit.lessons)
    const lesson = allLessons.find((l) => l.id === openLessonId)
    // a lesson you already finished opens in review mode: no hearts lost, nothing saved
    const review = completedLessons.includes(openLessonId)
    return <Lesson lesson={lesson} review={review} onFinish={finishLesson} onBack={goHome} />
  }

  return (
    <AppFrame completedLessons={completedLessons}>
      <Home completedLessons={completedLessons} onStartLesson={startLesson} />
    </AppFrame>
  )
}

export default App
