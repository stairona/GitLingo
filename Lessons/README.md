# GitLingo: UX & Lesson Decisions

Reference for when we start coding. Everything here was decided during UX planning.
Each lesson has its own folder with its content.

| Folder | Lesson | Demo user | Status |
|---|---|---|---|
| [lesson-1-git-vs-github](lesson-1-git-vs-github/lesson.md) | Git vs GitHub | none | ✅ Written |
| [lesson-2-setting-up-git](lesson-2-setting-up-git/lesson.md) | Setting up Git | Jackson Stark | ✅ Written |
| [lesson-3-main-commands](lesson-3-main-commands/lesson.md) | Main commands | Charley Dunkel | ✅ Written |
| [lesson-4-putting-it-on-github](lesson-4-putting-it-on-github/lesson.md) | Putting it on GitHub | Lily Lurvey | ✅ Written |

---

## The project

- **What:** GitLingo, a Duolingo-*style* app (our own look, not a copy) that teaches Git/GitHub.
- **Who it's for:** Total beginners. CS students who have never used Git.
- **Device:** Laptops (desktop layout only; no mobile layout).
- **Hackathon:** 24 hours, team of 2, both coding.
- **Track:** Games & Late Night Experiences. We lean on *game feel* (hearts, unlocking lessons, satisfying feedback, a win screen) and a midnight theme. **No late-night story.**
- **Demo scope:** Unit 1 (GitHub Fundamentals), 4 lessons. Units 2 & 3 appear on the map as locked.

## Game rules

- **Hearts:** 3 per lesson. Reset at the start of every lesson.
- Wrong answer → lose 1 heart. 0 hearts → "Out of hearts" screen → restart the lesson.
- **No streaks, no XP** (future ideas for the pitch).
- Lessons unlock in order: finishing one unlocks the next.

## Lesson structure (every lesson)

1. *(Lessons 2–4 only)* **"Meet your user"** card
2. **Teaching cards**: 3–4 sentences max each
3. **2 multiple-choice questions**
4. **2 terminal questions**

- Questions only test things a teaching card already explained.
- The progress bar covers the **whole lesson** (cards + questions).
- Answer order is **fixed**, never shuffled. No random variables anywhere.
- Wrong-answer messages always show **the correct answer and why**.

## Demo users

- One fixed demo user per lesson (Lesson 1 has none). Every playthrough is identical.
- The user types commands **as** that person.
- A **profile card** with all their info is visible on **every question** in Lessons 2–4 (right side of the screen), so the layout doesn't jump.
- Every exact value needed for an answer (name, email, commit message, URL) is printed on the profile card.
- All demo users are clearly fake: `@example.com` emails, invented-looking usernames.
- Lesson 2: **Jackson Stark** · Lesson 3: **Charley Dunkel** · Lesson 4: **Lily Lurvey**
- **Copy button:** long values on the profile card (Lesson 4's remote URL) get a **[ 📋 Copy ]** button → "✓ Copied!" for ~2 seconds. Paste (Ctrl+V) must work in the terminal box.

## The fake terminal

- It's just a **text box styled like a terminal**. Nothing runs, nothing touches the user's computer.
- Label it: **"Practice terminal (safe)"**.
- On Enter / Check, the input is compared to a **hard-coded list of accepted answers**.
- **Matching rules:**
  - Trim spaces at the start/end and collapse double spaces.
  - Each question has a **list** of accepted answers (e.g. `git add .` and `git add -A`; `"double"` and `'single'` quotes).
  - Otherwise exact match (case-sensitive).
- **Correct:** show hard-coded fake output under the command.
- **Wrong:** keep the typed text visible, show the red feedback bar with the correct command, lose a heart.
- Each terminal question's data = **prompt + accepted answers + fake output + optional starting history**.
- **Starting history** (optional): lines already shown in the terminal when the question opens, as if earlier commands were run. Some lines can be colored (red/green, like real `git status`). First used in Lesson 3.
- Commands that print nothing in real Git (e.g. `git config`, `git add`) show **no fake output**: "no news is good news" (taught in Lesson 2).

## Screens (5)

### 1. Home / unit map
```
┌────────────────────────────────────┐
│ GitLingo                           │
├────────────────────────────────────┤
│   UNIT 1: GitHub Fundamentals      │
│          (✓) Git vs GitHub         │
│              │                     │
│          (●) Setting up Git  ← you │
│              │                     │
│          (🔒) Main commands        │
│              │                     │
│          (🔒) Putting it on GitHub │
│   UNIT 2: Advanced      🔒         │
│   UNIT 3: Theory        🔒         │
└────────────────────────────────────┘
```
- Bubble states: done (✓), current (big, glowing, clickable), locked (grey).
- Only the current bubble is clickable.

### 2. Teaching card (+ "Meet your user" variation)
```
┌────────────────────────────────────┐
│  ✕   ▓▓▓░░░░░░░░░░░        ♥ ♥ ♥   │
├────────────────────────────────────┤
│   Title                            │
│   3–4 sentences of explanation     │
│   [ optional diagram / example ]   │
├────────────────────────────────────┤
│                      [ Continue ]  │
└────────────────────────────────────┘
```
- Top bar (✕ quit, progress bar, hearts) is identical on every lesson screen.
- "Meet your user" uses the same layout: avatar, name, short backstory, their info, "You'll be typing commands as ___", button **[ Let's go ]**.

### 3. Question screen: one frame, the middle changes
```
┌────────────────────────────────────────────────┐
│  ✕   ▓▓▓▓▓▓░░░░░░             ♥ ♥ ♥            │
├────────────────────────────────────────────────┤
│                              ┌──────────────┐  │
│  Question text               │ 👤 YOU ARE   │  │
│                              │ (profile     │  │
│  ┌ MIDDLE CHANGES ────────┐  │  card,       │  │
│  │ multiple choice OR     │  │  Lessons 2–4)│  │
│  │ practice terminal      │  │              │  │
│  └────────────────────────┘  └──────────────┘  │
├────────────────────────────────────────────────┤
│                                     [ Check ]  │
└────────────────────────────────────────────────┘
```
- **Multiple choice:** 3–4 stacked buttons. Clicking highlights; nothing submits until Check.
- **Terminal:** dark box, monospace, blinking cursor, `$` prompt. Enter = Check.
- **Feedback bar** (replaces the bottom bar after Check):
  - ✓ green: "Correct!" **[ Continue ]**
  - ✕ red: "Not quite. Answer: `...`" **[ Continue ]**, lose a heart

### 4. Lesson complete
Big ✓, "Lesson complete!", hearts left ("Perfect: no hearts lost!" if 3), **[ Continue ]** → back to the map with the next lesson unlocked. Small celebration animation.

### 5. Out of hearts
"Out of hearts", "Every mistake is how you learn Git", **[ Try again ]** (restarts the lesson), small **Back to map** link.

## Midnight theme

| Role | Color direction |
|---|---|
| Background | Deep navy / midnight blue (not pure black) |
| Cards / panels | Slightly lighter navy, floating above the background |
| Accent (one only) | One bright color for buttons, current bubble, progress bar (e.g. electric purple, cyan, or moonlight yellow) |
| Correct / wrong | Softened green / softened red |
| Terminal | **Darker than the background** (near-black), thin visible border, green or white monospace text |
| Body text | Light grey / white. Never mid-grey on navy (must read on a projector) |

## Demo talking points

- **Copy button (Lesson 4, Q3):** show it live. It teaches the real GitHub habit of copying your repo URL instead of typing it, and it keeps the game fair: we test *which command*, not typing skill, so nobody loses a heart to a typo.
- **Red → green in the terminal (Lesson 3):** the starting history shows `app.py` go from red (not staged) to green (staged), so users *see* staging happen.
- **Demo users:** you play as a character, which is part of what makes it feel like a game.

## Out of scope (pitch as "future ideas")

Accounts/login, streaks, XP, settings, sound, mobile layout, drag-and-drop questions,
put-in-order questions, Units 2 & 3 content.

## Still open

- Exact theme colors and accent color.
- Agree on the lesson data format with teammate.
- Optional: special "Unit 1 complete" screen after Lesson 4 as the demo's big ending.
