import { useState } from 'react'

const STORAGE_KEY = 'gitlingo-progress'

// localStorage can throw (private windows, blocked storage), so we fall back to an empty list
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
    // progress just won't survive a refresh
  }
}

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
