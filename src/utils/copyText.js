// Copy text to the player's clipboard, for the Copy buttons on profile cards
// (like Lily's GitHub URL). Returns true if it worked, false if it didn't.
//
// It's "async" because the browser does the copying in the background and
// answers a moment later. "await" waits for that answer before moving on.
export async function copyText(text) {
  // Copying can fail: some browsers block it, and it only works on secure
  // pages (https or localhost). Instead of crashing, we report false so the
  // button can say "Couldn't copy" and the player can copy it by hand.
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
