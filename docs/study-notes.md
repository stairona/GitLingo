# GitLingo study notes: what we can learn from react-duolingo

Heads up: these notes were written before our lesson decisions. Where they disagree (for example XP, streaks or phone layout), `docs/lessons/README.md` wins.

Source: https://github.com/bryanjenningz/react-duolingo (MIT license). We cloned it to `~/study/react-duolingo`, outside our project. We only read it, we never run it.

How to use these notes: each section covers one of our folders or tools. It points to the file in react-duolingo worth reading, the idea to take from it, and the simplest version for us. Read the idea, then write our own version. We need to be able to explain every line (see `CLAUDE.md`). Line numbers refer to `src/pages/*.tsx` in the version we cloned, so they might drift a bit.

---

## 0. The repo in one minute

It's a Duolingo UI clone with a unit map, lesson screen, profile, shop, leaderboard and a fake login. It's built with Next.js, TypeScript, Tailwind and Zustand. It's about 8.8k lines, but 3.8k of that is SVG icons and a lot of the rest is shop and leaderboard stuff we don't care about.

The actual lesson logic is small: `pages/lesson.tsx` (975 lines), `pages/learn.tsx` (647), `stores/*` (around 200 lines total) and `utils/units.ts` (83).

Keep in mind it's a UI prototype. Lessons are hardcoded with just 2 sample questions, nothing gets saved (no localStorage), and most buttons don't do anything. What's useful for us is the screens and the flow, not the data or saving.

### Their stack vs ours

| Theirs | Ours | What changes |
|---|---|---|
| Next.js (file-based pages, `next/router`) | Vite + React | No built-in routing, so we need our own way to switch screens (see the routing decision in section 3). |
| TypeScript | Plain JavaScript | Ignore the types. They just describe the shape of the data. |
| Tailwind (`rounded-2xl border-b-4` etc.) | Plain CSS + variables | Turn each look into a CSS class. The Tailwind class names work as a recipe for the style (section 5). |
| Zustand store | `useProgress` hook + localStorage | Same idea, one place for XP, streak and hearts, just simpler. And we actually save. |
| Lessons hardcoded in code | JSON files in `src/content/` | Their data shape is the inspiration, but we load from JSON. |
| Vercel | GitHub + Vercel | Same. |

---

## 1. `src/content/` (lesson JSON)

This is our biggest decision, and the repo makes it easy.

- The course map is plain data in `src/utils/units.ts`: a unit has a list of tiles, each with a type and a short description. For us that becomes one JSON file per unit, with unit, then lessons, then questions. One lesson is one tile.
- At the top of `pages/lesson.tsx` (`lessonProblem1`, `lessonProblem2`), a question is an object with a `type`, a `question` and the answers. Multiple choice stores the answer as an index. Tile ordering stores it as a list of indexes in the right order. We do the same thing (schema in section 6).
- After you answer, `onCheckAnswer` saves `question`, `yourResponse` and `correctResponse` for the review screen. We add an `explanation` to every question and show it after Check. That's where the actual teaching happens.

What we can't reuse: the Spanish content, and the fact that lessons just loop over 2 questions. We write real Git content.

## 2. `src/hooks/useProgress.js` (XP, streak, hearts, unlocking)

This is the core logic.

XP: `stores/createXpStore.ts` keeps XP per day as a `date -> xp` dictionary, which makes "today" and "this week" easy. For the MVP a single total `xp` number is enough. We can add per-day later if we want a weekly chart.

Streak: `stores/createStreakStore.ts` treats the streak as something calculated from a list of active days, not a number you keep adding to. It counts back from today until a day is missing. We store `activeDays: ["2025-01-01", ...]` and `getStreak()` counts the consecutive days.

Unlocking: `tileStatus` in `pages/learn.tsx` (line 41) decides if a tile is complete, active or locked by comparing its position to how many lessons are done. Nothing is stored per tile. For us, a lesson is unlocked when the previous lesson's id is in `completedLessons`.

Hearts: around line 82 of `pages/lesson.tsx`. You get 3 mistakes and the lesson ends when you go below 0. In their app hearts only show up in the "fast forward" test-out mode, not in normal lessons. Hearts are just `3 - mistakes this lesson`, so there's no need to save them. We keep them in the Lesson page state (or the hook) and reset them every time a lesson starts.

Rewards: `LessonComplete` (line 648) calls `increaseXp`, `addToday` and `increaseLessonsCompleted` on the end screen. Rewards happen once when the lesson ends, not after every question. Our `completeLesson(lessonId, xp)` does all three.

Saving: they don't have it, so we add it. Load from localStorage when the hook starts, save whenever state changes, and wrap it in try/catch.

They split their stores into small slices, one file each. We just use one hook in one file.

## 3. `src/pages/` and `src/App.jsx` (screens and flow)

### Home (unit map), from `pages/learn.tsx`

- `UnitSection` (line 309) and `UnitHeader` (line 609): each unit is a colored header ("Unit 1: ...") with a column of round lesson buttons under it. Map over `units`, then over each unit's lessons, and draw a button for each.
- `tileStatus` (line 41): complete, active and locked control the look (gold or green, pulsing, grey).
- Zig-zag layout (`tileLeftClassNames`, line 115): lessons get nudged left and right in a pattern so the path curves. We start with a straight column and add the zig-zag later with CSS `margin-left`.
- `TileTooltip` (line 197): clicking the active tile opens a small popup with the lesson name and a Start button. For the MVP we skip it and have the button go straight to the lesson.
- Skip: "jump to unit", treasure chests, dumbbell and trophy tiles, and the unit guidebook buttons.

### Lesson, from `pages/lesson.tsx`

This is the most useful file. Read it in this order:

1. The main `Lesson` component (lines ~58-226). Its state is the whole lesson engine: current question number, how many right, how many wrong, the selected answer, whether it's been checked yet, and a list of results. Those `useState` calls are the lesson. Get this and you get the app.
2. `onCheckAnswer`, `onFinish` and `onSkip`. Check marks the answer right or wrong and records it. Continue clears the selection and moves on. Easy to rewrite from that description.
3. `ProgressBar` (line 228): a bar whose width is `correct / needed`, with the hearts next to it. The width animates with a CSS `transition`.
4. `CheckAnswer` (line 340): the bottom bar. There's a Check button, and after checking, a green or red panel slides up with the right answer. That's exactly where our explanation goes.
5. The two question layouts. One is pick-an-option, where the answer is an index. The other is `ProblemWriteInEnglish` (line 522) with word tiles: clicking a tile in the tray adds its index to `selectedAnswers`, clicking one in the answer row removes it, and the order is just the array order. This maps straight onto our order-the-steps question.
6. `LessonComplete` (line 648): the end screen with total XP, time and accuracy, then the rewards when you hit Continue.
7. `ReviewLesson` (line 747): a list of the questions you got wrong, your answer next to the right one. Nice to have, stretch goal.
8. `QuitMessage` (line 285): the "are you sure you want to quit?" popup. Stretch.

They check answers with a simple `selected === correct` (or by comparing lists of indexes). That's all we need for multiple choice and ordering. For our type-the-command question, we trim spaces, lowercase the input and compare it against a list of accepted answers.

### Profile, from `pages/profile.tsx` (207 lines)

Stat boxes for total XP, streak and lessons. Stretch only. Skip the friends list, followers and fake users.

### Routing decision (you two need to pick)

Next.js gives them pages for free, Vite doesn't. Two options:

- A. `react-router-dom`, one new dependency, with routes `/`, `/lesson/:id` and `/profile`. It's the standard way and what judges will recognize. `CLAUDE.md` says to ask before adding dependencies, which is why this is a question.
- B. No library. Keep a `currentScreen` value in `App.jsx` state ("home", "lesson" or "profile") and render the matching page with an `if`. Easiest to understand, but no real URLs or back button.

## 4. `src/components/`

| Our component | Learn from | The idea |
|---|---|---|
| `LessonCard` | `TileIcon` + `UnitSection` in `learn.tsx` | A round button that looks different when completed, active or locked. |
| `Quiz` | the question layouts + `CheckAnswer` in `lesson.tsx` | Shows the question, picks a layout by `type`, handles Check and shows feedback. |
| `ProgressBar` | `ProgressBar` in `lesson.tsx` (line 228) | A box with an inner bar whose width is a percent. |
| `Hearts` | the hearts part of `ProgressBar` | Draw N filled hearts and the rest empty. |
| `XPBadge` | `TopBar.tsx` (streak and gem counts at the top) | A small pill with an icon and a number, grey when it's 0. |
| Extras (stretch) | `CheckAnswer` -> `FeedbackBar`, `LessonComplete` | Slide-up feedback panel and an end-of-lesson summary. |

Update (PR #9): we now borrow the layout idea from `LeftBar` and `RightBar` for our app frame. `Sidebar` is a fixed left column with the logo and bold uppercase menu items, the active one outlined. `RightPanel` is a sticky right column of stacked cards. We still skip everything inside them: the leaderboard, streak and gem popups, promo cards, language picker and "More" menu. Our right panel shows lessons finished and a "how it works" card instead.

Skip `BottomBar` (tab nav, though we might borrow the idea of 2-3 tabs), `Calendar`, `LanguageCarousel`, `LanguageDropDown`, `Flag`, `LoginScreen` and `Svgs.tsx` (3,854 lines of icons). We'll use our own simple icons, emoji or a few inline SVGs.

## 5. `src/styles/global.css` (look and feel)

They use Tailwind, so `globals.css` is only three lines. The real styling lives in the class names inside the components. Here's what's worth copying as design ideas:

- Pressable buttons: rounded corners with a thicker, darker bottom border, and a slight brightness change on hover. For us: `.btn { border-radius: 16px; border-bottom: 4px solid var(--btn-shadow); }` and shift it down 2px on `:active`.
- Progress bar fill: a rounded green bar with the width as a percent and a transition. For us: `.progress-fill { transition: width 0.5s; }`
- Feedback panel: a bar fixed to the bottom, light green when right and light red when wrong, sliding up into view. For us: a `.feedback` fixed to the bottom with `transform: translateY(100%)`, switched to `0` with a class.
- Popup overlay: black at 60% opacity over the whole screen. For us: a fixed full-screen div with `background: rgba(0,0,0,0.6)`.
- Unit colors: each unit has its own accent color. For us: one CSS variable per unit, like `--unit-1`.

Their app is light mode. We're going dark by default (Midnight Mode), so put the background, surface, text, border, accent, success and error colors in `:root` as CSS variables and only use those in components. A light theme can come later by redefining the variables.

For animation they only use CSS `transition` (width, position, opacity), no library. We'll do the same.

## 6. Our data shapes

### Lesson JSON (one file per unit)

Every question has an `id`, `type`, `prompt` and `explanation`.

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

`correct` is an index into `options`, same as their `correctAnswer`. `correctOrder` lists the indexes of `steps` in the right order, like their tile ordering. `distractors` are extra wrong tiles that show up in the tray but aren't part of the answer. Later we could add `os: "mac" | "windows" | "linux"` for questions that depend on the machine.

Progress stores lesson ids, so reordering lessons won't break anyone's saved progress.

### `useProgress` state and functions

Everything is saved in localStorage under one key, like `gitlingo-progress`.

```js
{
  xp: 0,                 // total XP
  activeDays: [],        // ["2025-01-01", ...] days with at least one finished lesson
  completedLessons: [],  // ["u1-l1", ...]
}
```

Hearts live in the Lesson page for the current lesson. Streak and unlock status are calculated, not stored.

- `completeLesson(lessonId, xp)` adds the id to `completedLessons` (only once), adds the XP and adds today to `activeDays`.
- `isUnlocked(lessonId)` returns true for the first lesson, or if the previous one is completed.
- `getStreak()` counts consecutive days back from today in `activeDays`.
- `resetProgress()` clears everything, which is handy for demos.

---

## 7. MVP vs stretch

MVP: Unit 1 content (3-4 lessons, about 5 questions each), multiple choice and type-the-command, a home map with locked and unlocked lessons, a lesson screen with progress bar, hearts, Check and green/red feedback with the explanation, an end screen, saved XP and completed lessons, a dark theme with CSS variables, a phone-width layout, and a Vercel deploy.

Stretch: order-the-steps questions, streak and a Profile page, a mistakes review (like their `ReviewLesson`), Units 2-3, the zig-zag map and lesson popup, quit confirmation, small animations, a Mac/Windows/Linux switch for setup lessons, and a light theme.

## 8. Ignore

These need a database, auth or payments, or are just noise: login, register and forgot-password, the leaderboard and fake users, the shop and lingots, the language picker and flags, sound settings, the daily XP goal, the calendar, the right-side promo bar, Next.js specifics (`_app.tsx`, `env.mjs`, `next.config.mjs`), TypeScript types, and the 3,854-line SVG file.

## 9. Top 5 to build first (and who)

1. Lesson JSON schema plus 2 sample Unit 1 lessons (section 6). Content person. Everything else depends on this shape, so agree on it in the first hour.
2. `useProgress` hook with localStorage (section 2). Content/logic person.
3. Quiz component with multiple choice and type-the-command, a Check button and green/red feedback with the explanation (the `CheckAnswer` idea). UI person. You can start with fake data copied from the schema example.
4. Lesson page with ProgressBar, Hearts, the question flow and the end screen (the main `Lesson` component and `LessonComplete`). UI person.
5. Home unit map with `LessonCard`, locked/unlocked states and the dark theme variables (`UnitSection` and `tileStatus`). UI person.

Once 1-3 are done, merge and test one lesson from start to finish before polishing anything.

## 10. Reading plan (about an hour, do it together)

| Time | Read | Goal |
|---|---|---|
| 10 min | `src/utils/units.ts` and `src/stores/*` | See how the course, XP and streak are modeled. |
| 25 min | `src/pages/lesson.tsx` (in the order from section 3) | Understand the lesson engine and tile ordering. |
| 15 min | `src/pages/learn.tsx` (`tileStatus`, `UnitSection`) | See how locked, active and complete drive the map. |
| 10 min | `TopBar.tsx` | See how XP and streak are shown at the top. |

When you're done reading, close the repo and write the first version yourself, then ask Claude to review it.

---

## Other repos we looked at (lower priority)

- DuoJuo (jdarmoni, no license found): Rails, Postgres and Redux, mostly backend. The only idea worth taking is that each skill has a locked/unlocked flag and a small "strength" indicator. Everything else needs a server. Ideas only, no code.
- Duolingo Exercise Project (KasraTabrizi, no license found): about 320 lines of plain HTML/CSS/JS with one exercise where you click words in order to build a sentence. It has extra distractor words and a `0.2s` transform transition so the tiles glide. The Check and Skip buttons don't actually work. The only takeaway is the distractor idea, which is already in section 6, and react-duolingo's tile ordering does the same job in React.
