# Understanding log

What we built, how AI helped, and how to explain each part in our own words.
Every PR adds an entry here. Read the "How to explain it" part before demoing or reviewing.

---

## PR #1: Tidy up our docs and lesson files (2026-11-14, Nicolas)
What it does: moved all the planning notes and the Unit 1 lesson write-ups into `docs/` with clear names, and added a `.gitignore`.
How AI helped: Claude did the renames with `git mv`, fixed the links, and rewrote the repo map.
How to explain it:
- `git mv` renames a file and keeps its history, so Git sees a rename, not a delete plus a new file.
- `.gitignore` lists files Git should never save, like `node_modules` (npm can rebuild it) and `.DS_Store` (Mac junk).
- Lessons are written in plain words in `docs/lessons/unit-1/` first, then copied into JSON for the app.

## PR #2: Set up the GitLingo app (2026-11-14, Nicolas)
What it does: created the Vite + React app, a placeholder page, the theme file, and the empty `src/` folders.
How AI helped: Claude ran the official Vite starter and copied over only the files we need.
How to explain it:
- `package.json` lists what the app needs and its commands (`npm run dev`, `build`, `lint`).
- `package-lock.json` pins exact versions so both of us install the same thing. npm writes it, not us.
- `index.html` has an empty `<div id="root">`. `main.jsx` starts React inside it, and `App.jsx` decides what to show.
- `.gitkeep` is an empty file that lets Git save an empty folder.

## PR #3: Dark purple neon midnight theme (2026-11-14, Nicolas)
What it does: put the Central Hacks purple palette into CSS variables in `src/styles/global.css`.
How AI helped: Claude wrote the variables from the palette we gave it.
How to explain it:
- A CSS variable like `--accent: #a855f7` is a named color. Components write `var(--accent)` instead of the hex code.
- Changing a color in one place changes it everywhere, and every screen stays consistent.
- Green (`--success`) and red (`--danger`) are only for right and wrong answers and hearts.

## PR #4: Unit 1 map on the home screen (2026-11-14, Nicolas)
What it does: the home screen shows Unit 1's four lessons as round bubbles (done, current or locked), plus Units 2 and 3 as coming soon.
How AI helped: Claude wrote the code after we said "just do it". We need to be able to explain it ourselves.
How to explain it:
- `unit-1.json` is the lesson list as data. The map draws itself from it with `.map()`.
- `useProgress` keeps a list of finished lesson ids in localStorage (the browser's small storage). Reads and writes are in try/catch, so a blocked browser doesn't crash the app.
- `getLessonStatus` in `Home.jsx`: if the id is in the finished list, it's "done". The first unfinished lesson is "current". Everything after that is "locked". Nothing is stored per bubble.
- `App.jsx` keeps `screen` ('home' or 'lesson') in state instead of using a routing library.
- Only the current bubble can be clicked, because the others use `disabled`.

## PR #5: Live site link (2026-11-14, Nicolas)
What it does: added the Vercel link to the README.
How to explain it: Vercel watches our GitHub repo and rebuilds the site every time something is merged into `main`.

## PR #6: Remove extra .gitkeep files (2026-11-14, Nicolas)
What it does: removed the placeholder files from folders that have real code now.
How to explain it: we typed the `git rm` and the commit ourselves. Only `src/utils` keeps its `.gitkeep` because it's still empty.

## PR #8: Nunito font (2026-11-14, Nicolas)
What it does: the whole app uses Nunito, a free rounded font, with extra bold titles, labels and buttons.
How AI helped: Claude checked react-duolingo (it uses no special font) and suggested Nunito as the closest free match.
How to explain it:
- Duolingo's real fonts (Feather, DIN Next Rounded) are owned by them or paid, so we can't use them.
- The font loads with a `<link>` in `index.html`, with no npm package. `preconnect` opens the connection to Google early so it loads faster.
- `display=swap` shows a backup font right away, then switches to Nunito, so text is never invisible.
- `--font-body` lists backup fonts in case Nunito can't load.

## PR #9: App frame with sidebar and progress panel (2026-11-14, Nicolas)
What it does: the home screen is now 3 columns like Duolingo: a sidebar with the logo and LEARN on the left, the unit map in the middle, and a progress panel on the right. Lessons still open full screen.
How AI helped: Claude studied react-duolingo's LeftBar and RightBar layout (ideas only, no code copied) and wrote the components after we asked.
How to explain it:
- `AppFrame.jsx` is a wrapper. Whatever we put between `<AppFrame>` and `</AppFrame>` arrives as `children` and is drawn in the middle column.
- `AppFrame.css` uses CSS grid: `grid-template-columns: 240px 1fr 340px` means a fixed sidebar, a middle that takes the leftover space, and a fixed right panel.
- `position: sticky; top: 0` keeps the sidebar and right panel in place while the middle scrolls.
- The progress bar is two divs. The inner one's width is the percent of lessons done (`finished / total * 100`), and `transition` makes it slide.
- We show "lessons finished" instead of streaks and gems, because we decided not to have XP or streaks.
- `App.jsx` only puts the frame around the home screen. The lesson screen is returned on its own, so it's full screen.
