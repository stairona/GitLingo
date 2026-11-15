import { useState } from 'react'
import TopBar from '../components/lesson/TopBar.jsx'
import TeachingCard from '../components/lesson/TeachingCard.jsx'
import MultipleChoice from '../components/lesson/MultipleChoice.jsx'
import FeedbackBar from '../components/lesson/FeedbackBar.jsx'
import PracticeTerminal from '../components/lesson/PracticeTerminal.jsx'
import LessonComplete from '../components/lesson/LessonComplete.jsx'
import OutOfHearts from '../components/lesson/OutOfHearts.jsx'
import MeetUserCard from '../components/lesson/MeetUserCard.jsx'
import ProfileCard from '../components/lesson/ProfileCard.jsx'
import { getLessonSteps } from '../utils/lessonSteps.js'
import { isAnswerCorrect } from '../utils/answerChecker.js'
import './Lesson.css'

// How many hearts every lesson starts with. A wrong answer costs one.
const STARTING_HEARTS = 3

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
  if (step.kind === 'welcome') return <MeetUserCard user={step.user} />
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
  // The answer being worked on right now, before CHECK:
  // which option is picked (0, 1, 2... or null), and what's typed in the terminal.
  const [draftPicked, setDraftPicked] = useState(null)
  const [draftTyped, setDraftTyped] = useState('')
  // Every answer that has been CHECKed, remembered by screen number, like
  // { 4: { picked: 0, typed: '' }, 6: { picked: null, typed: 'git help' } }.
  // Remembering them is what lets a player go back and still see their answers.
  const [answers, setAnswers] = useState({})

  // A screen counts as checked once it has a saved answer. Then the answer is
  // locked and the feedback bar shows, the same as right after pressing CHECK.
  const savedAnswer = answers[stepIndex]
  const checked = savedAnswer !== undefined
  // Show the saved answer if there is one, otherwise the one being worked on.
  const picked = checked ? savedAnswer.picked : draftPicked
  const typed = checked ? savedAnswer.typed : draftTyped

  // the bar fills as you move through the screens, and is full once you pass the last one
  const progress = stepIndex / steps.length

  // TRY AGAIN: everything back to how the lesson started
  function restart() {
    setStepIndex(0)
    setHearts(STARTING_HEARTS)
    setDraftPicked(null)
    setDraftTyped('')
    setAnswers({})
  }

  // the last heart is gone and its red bar has been closed with CONTINUE
  if (hearts === 0 && !checked) {
    return <OutOfHearts totalHearts={STARTING_HEARTS} onTryAgain={restart} onBack={onBack} />
  }

  // past the last screen: the lesson is done. CONTINUE calls onFinish, which saves it in App.
  if (stepIndex >= steps.length) {
    return (
      <LessonComplete
        title={lesson.title}
        hearts={hearts}
        totalHearts={STARTING_HEARTS}
        onContinue={onFinish}
      />
    )
  }

  const step = steps[stepIndex]
  const isQuestion = step.kind === 'question'
  // in lessons with a demo user, their info card sits beside every question
  const showProfile = isQuestion && lesson.user
  const isRight = isQuestion && getIsRight(step, picked, typed)

  // CHECK: save the answer for this screen (which locks it), and take a heart if it's wrong.
  // A saved answer can never be checked again, so hearts can't be won back.
  // Math.max keeps hearts from going below 0.
  function checkAnswer() {
    setAnswers({ ...answers, [stepIndex]: { picked: draftPicked, typed: draftTyped } })
    if (!isRight) setHearts(Math.max(0, hearts - 1))
  }

  // CONTINUE: clear the draft so the next question starts fresh, then move on.
  // The lesson moves on whether the answer was right or wrong (no retries).
  function goToNextStep() {
    setDraftPicked(null)
    setDraftTyped('')
    setStepIndex(stepIndex + 1)
  }

  return (
    <div className="lesson-screen">
      <div className="lesson-screen__top">
        <TopBar progress={progress} hearts={hearts} onQuit={onBack} />
      </div>
      <main className={`lesson-screen__body${showProfile ? ' lesson-screen__body--with-profile' : ''}`}>
        <StepScreen
          step={step}
          picked={picked}
          onPick={setDraftPicked}
          typed={typed}
          onType={setDraftTyped}
          onSubmit={checkAnswer}
          checked={checked}
          isRight={isRight}
        />
        {showProfile && <ProfileCard user={lesson.user} />}
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
                {step.kind === 'welcome' ? "Let's go" : 'Continue'}
              </button>
            )}
          </div>
        </footer>
      )}
    </div>
  )
}

export default Lesson
