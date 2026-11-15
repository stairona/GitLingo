import { useState } from 'react'
import Home from './pages/Home.jsx'
import Lesson from './pages/Lesson.jsx'
import AppFrame from './components/layout/AppFrame.jsx'
import { useProgress } from './hooks/useProgress.js'
import unit1 from './content/units/unit-1.json'

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

  return (
    <AppFrame completedLessons={completedLessons}>
      <Home completedLessons={completedLessons} onStartLesson={startLesson} />
    </AppFrame>
  )
}

export default App
