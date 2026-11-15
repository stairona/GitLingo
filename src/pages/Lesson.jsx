import { useState } from 'react'
import TopBar from '../components/lesson/TopBar.jsx'
import TeachingCard from '../components/lesson/TeachingCard.jsx'
import CodeText from '../components/lesson/CodeText.jsx'
import MultipleChoice from '../components/lesson/MultipleChoice.jsx'
import FeedbackBar from '../components/lesson/FeedbackBar.jsx'
import { getLessonSteps } from '../utils/lessonSteps.js'
import './Lesson.css'

// How many hearts every lesson starts with. A wrong answer costs one.
const STARTING_HEARTS = 3

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

// picked, onPick and checked are only used by multiple-choice questions.
function StepScreen({ step, picked, onPick, checked }) {
  if (step.kind === 'card') return <TeachingCard card={step} />
  if (step.kind === 'welcome') {
    return <ComingSoon label="Meet your user" title={step.user.name} note="The welcome card comes in a later PR." />
  }
  if (step.type === 'multiple-choice') {
    return <MultipleChoice question={step} picked={picked} onPick={onPick} checked={checked} />
  }
  return <ComingSoon label="Terminal question" title={step.prompt} note="The practice terminal comes in the next PR." />
}

// One lesson, played screen by screen: the welcome card, teaching cards, then questions,
// in the order getLessonSteps gives them.
function Lesson({ lesson, onFinish, onBack }) {
  const steps = getLessonSteps(lesson)
  const [stepIndex, setStepIndex] = useState(0)
  const [hearts, setHearts] = useState(STARTING_HEARTS)
  // Which option the player chose on this question (0, 1, 2...), or null for none yet.
  const [picked, setPicked] = useState(null)
  // Becomes true when CHECK is pressed. The answer is locked and the feedback bar shows.
  const [checked, setChecked] = useState(false)

  // the bar fills as you move through the screens, and is full once you pass the last one
  const progress = stepIndex / steps.length

  if (stepIndex >= steps.length) {
    return (
      <div className="lesson-screen">
        <div className="lesson-screen__top">
          <TopBar progress={1} hearts={hearts} onQuit={onBack} />
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

  const step = steps[stepIndex]
  const isMultipleChoice = step.type === 'multiple-choice'
  const isRight = picked === step.correctIndex

  // CHECK: lock the answer in, and take a heart if it's wrong.
  // Math.max keeps hearts from going below 0.
  function checkAnswer() {
    setChecked(true)
    if (!isRight) setHearts(Math.max(0, hearts - 1))
  }

  // CONTINUE: clear this question's answer so the next question starts fresh, then move on.
  // The lesson moves on whether the answer was right or wrong (no retries).
  function goToNextStep() {
    setPicked(null)
    setChecked(false)
    setStepIndex(stepIndex + 1)
  }

  return (
    <div className="lesson-screen">
      <div className="lesson-screen__top">
        <TopBar progress={progress} hearts={hearts} onQuit={onBack} />
      </div>
      <main className="lesson-screen__body">
        <StepScreen step={step} picked={picked} onPick={setPicked} checked={checked} />
      </main>

      {checked ? (
        <FeedbackBar isRight={isRight} message={step.wrongFeedback} onContinue={goToNextStep} />
      ) : (
        <footer className="lesson-screen__bottom">
          <div className="lesson-screen__bottom-inner">
            {isMultipleChoice ? (
              // CHECK stays grey until an option is picked, so you can't check an empty answer.
              <button className="lesson-button" onClick={checkAnswer} disabled={picked === null}>
                Check
              </button>
            ) : (
              <button className="lesson-button" onClick={goToNextStep}>
                Continue
              </button>
            )}
          </div>
        </footer>
      )}
    </div>
  )
}

export default Lesson
