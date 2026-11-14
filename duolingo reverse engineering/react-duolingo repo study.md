# GitLingo study notes: using react-duolingo to save time

Source: https://github.com/bryanjenningz/react-duolingo (MIT license), cloned to `~/study/react-duolingo`
(outside our project, read only, never run).

**How to use these notes:** each section is one of OUR folders or tools. It says which file in react-duolingo to
read, what idea to learn from it, and what the simplest version looks like for us. Read the idea, then write our
own version (see `CLAUDE.md`: we must be able to explain every line). Line numbers are for `src/pages/*.tsx`
and refer to the version we cloned, so they may drift.

---

## 0. What the repo is, in one minute

- A Duolingo UI clone: unit map, lesson screen, profile, shop, leaderboard, login (fake).
- Built with **Next.js + TypeScript + Tailwind + Zustand**. About 8.8k lines, but 3.8k are SVG icons and a lot is shop/leaderboard we ignore.
- Real lesson logic is small: `pages/lesson.tsx` (975 lines), `pages/learn.tsx` (647), `stores/*` (about 200 lines total), `utils/units.ts` (83).
- It is a UI prototype: **lessons are hardcoded (2 sample questions), nothing is saved** (no localStorage), most buttons are fake. The value for us is the *screens and flows*, not the data or persistence.

### Their stack vs ours

| Their tool | Our tool | What changes for us |
|---|---|---|
| Next.js (file-based pages, `next/router`) | Vite + React | No built-in routing. We need a way to switch screens (see decision at the end of section 3). |
| TypeScript | Plain JavaScript | Ignore type definitions; they just describe the shape of data. |
| Tailwind (class names like `rounded-2xl border-b-4`) | Plain CSS + variables | Translate each look into a CSS class. Tailwind classes are a handy "recipe" for the visual style (see section 5). |
| Zustand store | `useProgress` hook + localStorage | Same idea (one place for XP/streak/hearts), simpler tool, plus we add saving. |
| Hardcoded lessons in code | JSON files in `src/content/` | Their data shape is the inspiration; we load JSON instead. |
| Vercel (deploy) | GitHub + Vercel | Same. |

---

## 1. `src/content/` (lesson JSON) - **our biggest decision, lowest effort from this repo**

| What react-duolingo does | File | Our version |
|---|---|---|
| Course map is plain data: unit -> list of "tiles" (each with a type and a short description) | `src/utils/units.ts` | One JSON file per unit: unit -> lessons -> questions. A lesson is one tile. |
| A question is an object with a `type`, a `question`, and the answers. Multiple choice stores the answer as an **index**; tile-ordering stores the answer as a **list of indexes** in order | top of `pages/lesson.tsx` (`lessonProblem1`, `lessonProblem2`) | Same idea, see schema in section 6. |
| After answering, the results list keeps `question`, `yourResponse`, `correctResponse` for the review screen | `onCheckAnswer` in `pages/lesson.tsx` | We add an `explanation` field to every question and show it after Check. This is where the *teaching* happens. |

Not reusable: the actual Spanish content, and the fact that lessons loop over only 2 questions. We write real Git content.

## 2. `src/hooks/useProgress.js` (XP, streak, hearts, unlocking) - **the core logic**

| Idea | Where in react-duolingo | What to learn | Simplest version for us |
|---|---|---|---|
| **XP per day** stored as a dictionary `date -> xp` | `stores/createXpStore.ts` | Storing XP by date makes "today" and "this week" easy. | Total `xp` number is enough for MVP. Add per-day later if we want a weekly chart. |
| **Streak** = days with activity; count back from today until a day is missing | `stores/createStreakStore.ts` | A streak is *derived* from a list of active days, not a number you keep adding to. | Store `activeDays: ["2025-01-01", ...]`. `getStreak()` counts consecutive days back from today. |
| **Unlocking** a tile: complete / active / locked by comparing its position to how many lessons are done | `tileStatus` in `pages/learn.tsx` (line 41) | Status is *calculated* from one number, not stored per tile. | A lesson is unlocked when the previous lesson's id is in `completedLessons`. |
| **Hearts**: 3 mistakes allowed in a lesson, the lesson ends when you drop below 0. In the repo hearts only exist in the "fast forward" test-out mode, not in normal lessons | `hearts` in `pages/lesson.tsx` (around line 82) | Hearts are just `3 - mistakes this lesson`. They don't need to be saved. | Keep hearts in the Lesson page state (or the hook), reset on every lesson start. |
| **Lesson done -> reward**: on the complete screen, add XP, mark today active, bump lessons completed | `LessonComplete` (line 648, calls `increaseXp`, `addToday`, `increaseLessonsCompleted`) | Rewards happen once, when the lesson ends, not per question. | `completeLesson(lessonId, xp)` does all three. |
| **Saving**: not implemented in the repo | (none) | We must add it. | Load from localStorage when the hook starts, save when state changes, wrap in try/catch. |

Their stores are split into small "slices", one file each. For us, **one hook, one file**.

## 3. `src/pages/` and `src/App.jsx` (screens and flow)

### Home (unit map) <- `pages/learn.tsx`
- **`UnitSection` (line 309) + `UnitHeader` (line 609):** each unit is a colored header ("Unit 1: ...") followed by a column of round lesson buttons. Idea: map over `units`, map over each unit's lessons, draw a button per lesson.
- **`tileStatus` (line 41):** the three states complete / active / locked drive the look (gold or green, pulsing, grey).
- **Zig-zag layout (`tileLeftClassNames`, line 115):** lessons are nudged left and right in a repeating pattern so the path curves. Simplest for us: a vertical column. Add the zig-zag later by shifting each button with CSS `margin-left`.
- **`TileTooltip` (line 197):** clicking the active tile opens a small popup with the lesson name and a Start button. MVP: skip the popup, make the button go straight to the lesson.
- Skip: the "jump to unit", treasure chests, dumbbell/trophy tile types, and Unit "guidebook" buttons.

### Lesson <- `pages/lesson.tsx` (the most valuable file)
Read it in this order:
1. **The main `Lesson` component (top, lines ~58-226):** the state it keeps is the whole lesson engine:
   current question number, how many correct, how many incorrect, the selected answer, whether the answer has been "checked" yet, and a list of results. That list of `useState` calls IS the lesson. Understand this and you understand the app.
2. **`onCheckAnswer` / `onFinish` / `onSkip`:** Check marks the answer correct or wrong and records it. "Continue" clears the selection and moves to the next question. Easy to rewrite from the description above.
3. **`ProgressBar` (line 228):** a bar whose width is `correct / needed` plus the hearts next to it. Width changes with a CSS `transition`.
4. **`CheckAnswer` (line 340):** the bottom bar: a Check button, and after checking, a green or red panel that slides up with the right answer. This is exactly where we show our explanation.
5. **Two question layouts:** pick one of several options (the answer is an index) and `ProblemWriteInEnglish` (line 522): word tiles. Clicking a tile in the tray adds its index to `selectedAnswers`, clicking a tile in the answer row removes it, and the order is the array order. This maps directly to our **order-the-steps** question.
6. **`LessonComplete` (line 648):** the end screen with Total XP, time, and accuracy boxes, then rewards on Continue.
7. **`ReviewLesson` (line 747):** a list of the questions you missed, with your answer vs the right one. Nice for learning; stretch goal.
8. **`QuitMessage` (line 285):** "are you sure you want to quit?" popup. Stretch.

Their lesson only checks answers by comparing `selected === correct` (or lists of indexes). That is all we need for multiple choice and ordering. For our **type the command** question we compare typed text with a list of accepted strings after trimming spaces and lowercasing.

### Profile <- `pages/profile.tsx` (207 lines)
Stat boxes (total XP, streak, lessons). Stretch only. Skip the friends list, followers, and the fake users.

### Routing decision (needs a choice from you two)
Next.js gives them pages for free; Vite does not. Two options:
- **A. `react-router-dom`** (one new dependency): routes `/`, `/lesson/:id`, `/profile`. Standard and what judges will recognize. `CLAUDE.md` says to ask before adding dependencies, so this is the question.
- **B. No library:** a `currentScreen` value in `App.jsx` state ("home" / "lesson" / "profile") and an `if` that renders the matching page. Smallest thing to understand, but no real URLs or back button.

## 4. `src/components/`

| Our component | Learn from | Idea (one line) |
|---|---|---|
| `LessonCard` | `TileIcon` + `UnitSection` in `learn.tsx` | A round button whose look depends on `completed / active / locked`. |
| `Quiz` | `lesson.tsx` question layouts + `CheckAnswer` | Shows the question, picks the layout by `type`, handles Check, shows feedback. |
| `ProgressBar` | `ProgressBar` in `lesson.tsx` (line 228) | A box with an inner bar whose width is a percent. |
| `Hearts` | hearts part of `ProgressBar` | Draw N filled hearts and the rest empty. |
| `XPBadge` | `TopBar.tsx` (the streak/gems numbers at the top) | A small pill with an icon and a number, grey when it is 0. |
| Extras (stretch) | `CheckAnswer` -> `FeedbackBar`; `LessonComplete` | Slide-up feedback panel; end-of-lesson summary. |

Skip: `LeftBar`, `RightBar` (644 lines of leaderboard/promo cards), `BottomBar` (tab nav; we may borrow the idea of 2-3 tabs), `Calendar`, `LanguageCarousel`, `LanguageDropDown`, `Flag`, `LoginScreen`, `Svgs.tsx` (3,854 lines of icons: use our own simple icons, emoji or a few inline SVGs).

## 5. `src/styles/global.css` (look and feel)

react-duolingo uses Tailwind utility classes, and `globals.css` is only three Tailwind lines. The style "recipe" lives in class names inside the components. What to copy as *design ideas*:

| Design idea | How they do it | Our plain CSS version |
|---|---|---|
| **Pressable buttons** | rounded corners + a thicker bottom border in a darker shade; slight brightness change on hover | `.btn { border-radius: 16px; border-bottom: 4px solid var(--btn-shadow); }` and on `:active` shift down 2px. |
| **Progress bar fill** | green rounded bar, width as percent, `transition` on width | `.progress-fill { transition: width 0.5s; }` |
| **Feedback panel** | fixed bottom bar, light green when right, light red when wrong; slides up by toggling position | A `.feedback` fixed to the bottom with `transform: translateY(100%)`, toggled to `0` with a class. |
| **Dark overlay for popups** | black at 60% opacity over the whole screen | A fixed full-screen div with `background: rgba(0,0,0,0.6)`. |
| **Colors per unit** | each unit has its own accent color | One CSS variable per unit, for example `--unit-1`. |

Their app is light-mode. **We build dark by default (Midnight Mode)**, so put background, surface, text, border, accent, success and error colors in `:root` as CSS variables and use only those variables in components. A light theme can be a stretch goal by redefining the variables.

Animations they use: only CSS `transition` (width, position, opacity). No animation library. We do the same.

## 6. Proposed shapes (our own, inspired by the above)

### Lesson JSON (one file per unit)
Every question has `id`, `type`, `prompt` and `explanation`.

```json
{
  "unit": 1,
  "title": "GitHub fundamentals",
  "lessons": [
    {
      "id": "u1-l1",
      "title": "Git vs GitHub",
      "xp": 10,
      "questions": [
        {
          "id": "u1-l1-q1",
          "type": "multiple_choice",
          "prompt": "Which one stores your project online so others can see it?",
          "options": ["Git", "GitHub", "VS Code", "Terminal"],
          "correct": 1,
          "explanation": "Git tracks changes on your computer. GitHub hosts repos online."
        },
        {
          "id": "u1-l1-q2",
          "type": "type_command",
          "prompt": "Type the command that saves your staged changes with the message \"first commit\".",
          "accepted": ["git commit -m \"first commit\"", "git commit -m 'first commit'"],
          "explanation": "git commit records a snapshot. -m adds the message."
        },
        {
          "id": "u1-l1-q3",
          "type": "order_steps",
          "prompt": "Put these steps in order to share a change.",
          "steps": ["git push", "git add .", "git commit -m \"msg\""],
          "correctOrder": [1, 2, 0],
          "distractors": ["git pull"],
          "explanation": "Stage it, commit it, then push it to GitHub."
        }
      ]
    }
  ]
}
```

Notes: `correct` is an index into `options` (same idea as their `correctAnswer`); `correctOrder` lists
indexes into `steps` in the right order (their tile-ordering idea); `distractors` are extra wrong tiles shown in the tray
but not part of the answer. Optional later: `os: "mac" | "windows" | "linux"` for machine-dependent questions.
Progress stores lesson **ids**, so reordering lessons never breaks saved progress.

### `useProgress` state and functions
Saved in localStorage under one key, for example `gitlingo-progress`.

```js
{
  xp: 0,                 // total XP
  activeDays: [],        // ["2025-01-01", ...] days with at least one finished lesson
  completedLessons: [],  // ["u1-l1", ...]
}
```
Hearts live in the Lesson page for the current lesson. Streak and unlock status are calculated, not stored.

| Function | What it does |
|---|---|
| `completeLesson(lessonId, xp)` | Adds the id to `completedLessons` once, adds XP, adds today to `activeDays`. |
| `isUnlocked(lessonId)` | True if it is the first lesson, or the previous lesson is completed. |
| `getStreak()` | Counts consecutive days back from today in `activeDays`. |
| `resetProgress()` | Clears everything (handy for demos). |

---

## 7. MVP vs stretch

**MVP:** Unit 1 content (3-4 lessons, about 5 questions each); multiple choice and type-the-command; Home map with locked/unlocked lessons; Lesson screen with progress bar, hearts, Check, green/red feedback with explanation; end screen; XP and completed lessons saved; dark theme with CSS variables; phone-width layout; Vercel deploy.

**Stretch:** order-the-steps question; streak and Profile page; mistakes review (their `ReviewLesson`); Units 2-3; zig-zag map and lesson popup; quit confirmation; small animations; Mac/Windows/Linux switch for setup lessons; light theme.

## 8. Ignore (needs a database, auth, payments, or is just noise)

Login/register/forgot-password, leaderboard and fake users, shop and lingots, language picker and flags, sound settings, daily XP goal, calendar, the right-side promo bar, Next.js specifics (`_app.tsx`, `env.mjs`, `next.config.mjs`), TypeScript types, and the 3,854-line SVG file.

## 9. Top 5 to build first (and who)

1. **Lesson JSON schema + 2 Unit 1 sample lessons** (section 6). *Content person.* Everything else depends on this shape. Agree on it in the first hour.
2. **`useProgress` hook with localStorage** (section 2). *Content/logic person.*
3. **Quiz component: multiple choice + type-the-command, Check button, green/red feedback with explanation** (`CheckAnswer` idea). *UI person.* Can start with fake data copied from the schema example.
4. **Lesson page: ProgressBar + Hearts + question flow + complete screen** (main `Lesson` component and `LessonComplete` ideas). *UI person.*
5. **Home unit map with `LessonCard`, locked/unlocked states and the dark theme variables** (`UnitSection` + `tileStatus` ideas). *UI person.*

Checkpoint: after 1-3 exist, merge and test one lesson end to end before polishing.

## 10. Quick reading plan (about 1 hour total, do it together)

| Time | Read | Goal |
|---|---|---|
| 10 min | `src/utils/units.ts` and `src/stores/*` | See how a course and XP/streak are modeled. |
| 25 min | `src/pages/lesson.tsx` (sections in the order of section 3) | Understand the lesson engine and tile ordering. |
| 15 min | `src/pages/learn.tsx` (`tileStatus`, `UnitSection`) | Understand how locked/active/complete drives the map. |
| 10 min | `TopBar.tsx` | See how XP/streak are shown at the top. |

After reading, **close the repo and write the first version yourself**, then ask Claude to review it.

---

## Appendix: other repos checked (lower priority)

- **DuoJuo** (jdarmoni, no license found): Rails + Postgres + Redux, backend-heavy. Only idea worth taking: each skill has a locked/unlocked flag and a small "strength" indicator. Everything else needs a server. Ideas only, no code.
- **Duolingo Exercise Project** (KasraTabrizi, no license found): about 320 lines of plain HTML/CSS/JS with one exercise, "click words in order to build a sentence", with extra distractor words and a `0.2s` transform transition to glide tiles. The Check and Skip buttons are not wired up. Its only takeaway is the distractor idea, already included in section 6. react-duolingo's tile ordering does the same job in React.
