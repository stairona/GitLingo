import { useState } from 'react'

// Everything we save lives under this one key in the browser's localStorage.
const STORAGE_KEY = 'gitlingo-progress'

// Read the saved list of finished lesson ids, like ["u1-l1", "u1-l2"].
// localStorage can fail (private windows, blocked storage), so on any
// problem we just start fresh with an empty list instead of crashing.
function loadCompletedLessons() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function saveCompletedLessons(lessonIds) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lessonIds))
  } catch {
    // If saving fails the app still works, progress just won't survive a refresh.
  }
}

// Remembers which lessons are finished, even after closing the browser.
// Call it once (in App) and pass the results down, so every screen shares the same list.
export function useProgress() {
  const [completedLessons, setCompletedLessons] = useState(loadCompletedLessons)

  function completeLesson(lessonId) {
    if (completedLessons.includes(lessonId)) return
    const updated = [...completedLessons, lessonId]
    setCompletedLessons(updated)
    saveCompletedLessons(updated)
  }

  return { completedLessons, completeLesson }
}
