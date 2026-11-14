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

## PR #7: Unit 2 lessons (2026-11-14, Gavin)
What it does: planned Unit 2 and wrote its four lessons (branches, merging with a pull request, teamwork, undoing mistakes) in `docs/lessons/unit-2/`.
How AI helped: Claude drafted the lesson text and readme updates from our decisions; Gavin reviewed and approved them.
Can we explain it? Yes

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

## PR #11: Moon logo and tab icon (2026-11-14, Nicolas)
What it does: adds our crescent-moon logo (with a git branch inside) to the sidebar, and replaces Vite's default browser-tab icon with a small version of the moon.
How AI helped: Nicolas made the logo. Claude checked it at real sizes, moved one dot so the side branch reads better, made the cropped tab-icon version, and added it to the sidebar.
How to explain it:
- Files in `public/` are served as they are, so `public/gitlingo-logo.svg` loads at `/gitlingo-logo.svg`.
- SVG is an image made of shapes and lines, so it stays sharp at any size and is only about 2 KB.
- `viewBox` is the part of the drawing that's shown. The big logo leaves extra room for the glow. The favicon uses a tighter `viewBox`, so the moon fills the tiny tab.
- The glow is a `feGaussianBlur` filter (a blur) on copies of the moon's outline. At 16px it's just fuzz, so the favicon skips it and uses thicker lines.
- `alt=""` on the sidebar image tells screen readers it's decoration, so they read "GitLingo" from the text next to it instead of reading it twice.

## PR #12: Design foundations (2026-11-14, Nicolas)
What it does: adds a code font, a spacing scale and text sizes, replaces every emoji with our own drawn icons, and centers the page.
How AI helped: Claude wrote the tokens, the icon component and the layout change after we approved the polish plan (PR A2). Study notes used: section 5 (CSS variables) and section 4 (our own simple inline SVG icons).
How to explain it:
- JetBrains Mono loads in the same Google Fonts link as Nunito. `--font-mono` is for anything code: commands, hashes, file paths.
- Spacing tokens (`--space-1` to `--space-10`, 4px up to 96px) and text sizes (`--text-xs` to `--text-3xl`) mean we pick from a short list instead of inventing numbers. That's why the spacing looks even.
- `Icon.jsx` keeps a small list of SVG drawings and shows one by name: `<Icon name="lock" />`. They use `currentColor`, so an icon is the same color as the text around it.
- `aria-hidden="true"` on icons: they're decoration, so screen readers skip them and read the words next to them.
- In `AppFrame.css`, the page and the right panel are wrapped in one flex row with `justify-content: center`, so they stay together in the middle. `flex: 0 1 640px` means up to 640px wide, and allowed to shrink.

## PR #13: Pressable zig-zag path (2026-11-14, Nicolas)
What it does: lesson circles look like real buttons you can press, the path zig-zags with a curvy line joining the lessons, and locked items use a readable grey instead of being see-through.
How AI helped: Claude wrote the code from the polish plan (PR B). Study notes used: section 3 (react-duolingo's zig-zag idea: nudge each lesson left or right) and section 5 (pressable buttons with a thick darker bottom edge). Their code is a fixed list of offsets. Ours uses a sine wave, and no code was copied.
How to explain it:
- The "lip" is a solid `box-shadow` straight below the circle (`0 8px 0 color`). On click (`:active`), the circle moves down 8px and the shadow goes to 0, so it looks pushed in.
- `prefers-reduced-motion`: if someone turns off animations in their computer settings, the glow stops pulsing.
- `utils/pathLayout.js` holds the shared numbers: row height, circle slot, and `getPathOffset(index)`. `Math.sin(index * π / 2) * 72` gives 0, 72, 0, -72..., which is the zig-zag.
- `PathLine.jsx` draws an SVG path through every circle's center. `M` moves to the first point. Each `C` is a curve whose two control points pull the line straight down out of one circle and straight down into the next, which makes the S shape.
- Names are `position: absolute` beside the circle, on the outside of the bend (`labelSide`), so they never push the circle off center and the line never crosses them.
- Locked things use `--text-dim` (a readable grey) instead of `opacity`, which washes out on a projector. `--text-dim` is one new neutral grey, not a new brand color.
