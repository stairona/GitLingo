import { useState } from 'react'
import TopBar from '../components/lesson/TopBar.jsx'
import TeachingCard from '../components/lesson/TeachingCard.jsx'
import CodeText from '../components/lesson/CodeText.jsx'
import MultipleChoice from '../components/lesson/MultipleChoice.jsx'
import FeedbackBar from '../components/lesson/FeedbackBar.jsx'
import PracticeTerminal from '../components/lesson/PracticeTerminal.jsx'
import { getLessonSteps } from '../utils/lessonSteps.js'
import { isAnswerCorrect } from '../utils/answerChecker.js'
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

// The three question rules, one place each. Both question types go through these,
// so the rest of Lesson.jsx doesn't care which type the question is.

// Has the player given an answer yet? CHECK stays grey until they have.
function hasAnswer(step, picked, typed) {
  if (step.type === 'multiple-choice') return picked !== null
  return typed.trim() !== ''
}

// Multiple choice compares positions. Terminal answers use the checker, which
// ignores extra spaces but not uppercase letters.
function getIsRight(step, picked, typed) {
  if (step.type === 'multiple-choice') return picked === step.correctIndex
  return isAnswerCorrect(typed, step.acceptedAnswers)
}

// What the red bar says. Terminal questions have no wrongFeedback in the lesson
// files, so we show the first accepted answer instead.
function getWrongMessage(step) {
  if (step.type === 'multiple-choice') return step.wrongFeedback
  return `The answer is \`${step.acceptedAnswers[0]}\``
}

// Shows the current screen. The answer props are only used by questions.
function StepScreen({ step, picked, onPick, typed, onType, onSubmit, checked, isRight }) {
  if (step.kind === 'card') return <TeachingCard card={step} />
  if (step.kind === 'welcome') {
    return <ComingSoon label="Meet your user" title={step.user.name} note="The welcome card comes in a later PR." />
  }
  if (step.type === 'multiple-choice') {
    return <MultipleChoice question={step} picked={picked} onPick={onPick} checked={checked} />
  }
  return (
    <PracticeTerminal
      question={step}
      typed={typed}
      onType={onType}
      onSubmit={onSubmit}
      checked={checked}
      isRight={isRight}
    />
  )
}

// One lesson, played screen by screen: the welcome card, teaching cards, then questions,
// in the order getLessonSteps gives them.
function Lesson({ lesson, onFinish, onBack }) {
  const steps = getLessonSteps(lesson)
  const [stepIndex, setStepIndex] = useState(0)
  const [hearts, setHearts] = useState(STARTING_HEARTS)
  // Which option the player chose on this question (0, 1, 2...), or null for none yet.
  const [picked, setPicked] = useState(null)
  // What the player typed in the practice terminal on this question.
  const [typed, setTyped] = useState('')
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
  const isQuestion = step.kind === 'question'
  const isRight = isQuestion && getIsRight(step, picked, typed)

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
    setTyped('')
    setChecked(false)
    setStepIndex(stepIndex + 1)
  }

  return (
    <div className="lesson-screen">
      <div className="lesson-screen__top">
        <TopBar progress={progress} hearts={hearts} onQuit={onBack} />
      </div>
      <main className="lesson-screen__body">
        <StepScreen
          step={step}
          picked={picked}
          onPick={setPicked}
          typed={typed}
          onType={setTyped}
          onSubmit={checkAnswer}
          checked={checked}
          isRight={isRight}
        />
      </main>

      {checked ? (
        <FeedbackBar isRight={isRight} message={getWrongMessage(step)} onContinue={goToNextStep} />
      ) : (
        <footer className="lesson-screen__bottom">
          <div className="lesson-screen__bottom-inner">
            {isQuestion ? (
              // CHECK stays grey until there's an answer, so you can't check an empty one.
              <button className="lesson-button" onClick={checkAnswer} disabled={!hasAnswer(step, picked, typed)}>
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
