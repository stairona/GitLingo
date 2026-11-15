import { useState } from 'react'
import TopBar from '../components/lesson/TopBar.jsx'
import TeachingCard from '../components/lesson/TeachingCard.jsx'
import CodeText from '../components/lesson/CodeText.jsx'
import { getLessonSteps } from '../utils/lessonSteps.js'
import './Lesson.css'

const HEARTS = 3

// Screens that aren't built yet. Each one gets replaced in its own PR.
function ComingSoon({ label, title, note }) {
  return (
    <div className="coming-soon">
      <span className="coming-soon__label">{label}</span>
      <h1 className="coming-soon__title">
        <CodeText text={title} />
      </h1>
      <p className="coming-soon__note">{note}</p>
    </div>
  )
}

function StepScreen({ step }) {
  if (step.kind === 'card') return <TeachingCard card={step} />
  if (step.kind === 'welcome') {
    return <ComingSoon label="Meet your user" title={step.user.name} note="The welcome card comes in a later PR." />
  }
  const label = step.type === 'terminal' ? 'Terminal question' : 'Multiple choice'
  return <ComingSoon label={label} title={step.prompt} note="Questions come in the next PRs." />
}

// One lesson, played screen by screen: the welcome card, teaching cards, then questions,
// in the order getLessonSteps gives them.
function Lesson({ lesson, onFinish, onBack }) {
  const steps = getLessonSteps(lesson)
  const [stepIndex, setStepIndex] = useState(0)

  // the bar fills as you move through the screens, and is full once you pass the last one
  const progress = stepIndex / steps.length

  if (stepIndex >= steps.length) {
    return (
      <div className="lesson-screen">
        <div className="lesson-screen__top">
          <TopBar progress={1} hearts={HEARTS} onQuit={onBack} />
        </div>
        <main className="lesson-screen__body">
          <ComingSoon label="End of lesson" title={lesson.title} note="The real lesson complete screen comes in a later PR." />
          <div className="lesson-screen__test-actions">
            <button className="lesson-button" onClick={onFinish}>
              Finish lesson (test)
            </button>
            <button className="lesson-link" onClick={onBack}>
              Back to map
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="lesson-screen">
      <div className="lesson-screen__top">
        <TopBar progress={progress} hearts={HEARTS} onQuit={onBack} />
      </div>
      <main className="lesson-screen__body">
        <StepScreen step={steps[stepIndex]} />
      </main>
      <footer className="lesson-screen__bottom">
        <div className="lesson-screen__bottom-inner">
          <button className="lesson-button" onClick={() => setStepIndex(stepIndex + 1)}>
            Continue
          </button>
        </div>
      </footer>
    </div>
  )
}

export default Lesson
