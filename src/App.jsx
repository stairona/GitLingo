import { useState } from 'react'
import Home from './pages/Home.jsx'
import Lesson from './pages/Lesson.jsx'
import AppFrame from './components/AppFrame.jsx'
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

  // Lessons take the full screen with no sidebar, so you can focus.
  if (screen === 'lesson') {
    const lesson = unit1.lessons.find((l) => l.id === openLessonId)
    return <Lesson lesson={lesson} onFinish={finishLesson} onBack={goHome} />
  }

  // Count only Unit 1 lessons, in case old ids are still saved in the browser.
  const finishedCount = unit1.lessons.filter((l) => completedLessons.includes(l.id)).length

  return (
    <AppFrame finishedCount={finishedCount} totalCount={unit1.lessons.length}>
      <Home completedLessons={completedLessons} onStartLesson={startLesson} />
    </AppFrame>
  )
}

export default App
