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

## PR #14: Lesson path drawn like git log (2026-11-14, Nicolas)
What it does: the lesson map now reads like a commit history. Each reached lesson shows a short commit hash, the current lesson has a `HEAD -> main` tag, and the line is solid where you've been and dashed ahead.
How AI helped: Claude wrote the code from the polish plan (PR C). Study notes used: section 2 ("status is calculated, not stored"). The solid and dashed parts come from the same finished-lessons list, so nothing new is saved.
How to explain it:
- Real Git names every commit with a hash, a code made from its contents. Short hashes like `a1f9c2e` are the first 7 characters. Ours are made up and stored in `unit-1.json`.
- A commit only gets its hash once it's made, so locked lessons don't show one yet (`showHash` in `LessonBubble.jsx`).
- `HEAD -> main` is exactly what `git log --oneline` prints next to the commit you're on. We put it on the current lesson. JetBrains Mono turns `->` into an arrow by itself (a font "ligature").
- `PathLine.jsx` now draws two lines: `points.slice(0, head + 1)` for the solid part you've walked, and `points.slice(head)` for the dashed part ahead. Both start or end at the current lesson, so they meet there.
- `stroke-dasharray: 2 12` draws a 2px dash, then a 12px gap, over and over.

## PR #16: Unit guides (pixel characters) on the map (2026-11-14, Nicolas)
What it does: each unit has a guide drawn as a little pixel character: Jackson for Unit 1, Charley for Unit 2, Lily for Unit 3. Jackson stands next to your current lesson, points at it and says a line. When you finish a lesson, Jackson moves to the next one. Hover over any guide to see a card with their story. Charley and Lily wait in grey on the locked Unit 2 and 3 cards.
How AI helped: Nicolas chose the idea (one guide per unit, moving lesson to lesson, hover info) and the looks (pixel style; Jackson short brown hair, Charley tall with brown hair, Lily medium blond hair). Claude drew our own sprites in that style (nothing copied from the reference), wrote the components, and took each character's story from our lesson docs.
How to explain it:
- Each sprite in `content/characters.js` is a list of strings. Every letter is one pixel (H hair, S skin, T shirt, P pants...) and a dot is empty. Each character has two poses: `stand` and `point`.
- `PixelCharacter.jsx` goes through every row and letter and draws a 6x6 square in that letter's color. To point left, it mirrors the drawing inside the SVG with `scale(-1 1)`.
- Which guide belongs to which unit is in the unit files (`"guide": "jackson"` in `units/unit-1.json`). Each lesson's `says` line is what the guide says there, and `guideDone` is what they say once the unit is finished.
- `Home.jsx` works out `guideIndex`: the first unfinished lesson, or the last lesson if all are done. Only that row draws `<UnitGuide>`, so finishing a lesson moves the guide down one row. A short CSS animation makes it slide in.
- `CharacterCard.jsx` is always in the page but hidden (`visibility: hidden; opacity: 0`). CSS shows it on `:hover` or `:focus-within`, so it also works with the keyboard (`tabIndex={0}` makes the character reachable with Tab).
- The hovered lesson row gets `z-index: 2`, so the card shows on top of the rows below it.
- Locked guides use `filter: grayscale(1) brightness(0.6)`, and hovering removes the filter.
- `\u00a0` is a space that never breaks, so lesson codes like "U3 L4" never split across two lines.

## PR #18: Shorter character hover card (2026-11-14, Nicolas)
What it does: hovering over Jackson, Charley or Lily now only shows which unit they guide, their full name and their short story. The GitHub name, email and "Plays in" list are gone.
How AI helped: Nicolas asked for the card to be shorter, and Claude removed the extra rows.
How to explain it:
- The extra details lived in a `facts` list in `content/characters.js`, and `CharacterCard.jsx` drew one row per fact. We deleted the list, the code that drew it, and its CSS, so nothing unused is left behind.

## PR #19: Guide cards point to the next lesson (2026-11-14, Nicolas)
What it does: a guide's hover card now says who they are plus the next lesson, for example "Next up: Lesson 3, Main commands". On a unit's last lesson it points to the next unit's first lesson. Lily at the very end of the course keeps her full story.
How AI helped: Nicolas described the rule, and Claude wrote it and checked every case.
How to explain it:
- `characters.js` now has a short `intro` (who they are) next to the longer `about`.
- `utils/guideNote.js` builds the text from where the guide stands: the lesson right after it in the same unit, or else Lesson 1 of the next unit, or else (no next unit) the full `about`.
- It uses Gavin's `content/index.js`, which lists all units in order, so "the next unit" is just the next item in that list.
- Waiting guides on locked units pass `-1` as their lesson, so their "next lesson" is their unit's Lesson 1.

## PR #20: Guides talk to you on their hover card (2026-11-14, Nicolas)
What it does: the hover card is now in the guide's own voice, talking to you, and a bit longer. For example: "Hi, I'm Jackson! I just got a new laptop... In the next lesson, you'll help me set up Git on my computer, so every change I save is signed with my name and email."
How AI helped: Nicolas asked for first person and a fuller description of the next lesson. Claude wrote every line from the lesson docs and checked all 14 cards.
How to explain it:
- `characters.js` keeps what each guide says: `intro` (hello, who they are), `next` (one line per lesson id about the lesson after it), `waiting` (for locked units, about their first lesson) and `finale` (Lily's goodbye at the very end).
- `utils/guideNote.js` picks the right line: `waiting` if the guide is still on a locked unit (`-1`), otherwise `next[lesson.id]`, and if there's no next line (the last lesson of the course), `finale`.
- `??` means "use the left side, or the right side if the left is missing". That's how the last lesson falls back to `finale`.
- The lines describe the next lesson's story from our docs, like Charley's dark mode branch or Lily's broken contact form, so the map and the lessons tell the same story.

## PR #21: Guide cards name the next lesson (2026-11-14, Nicolas)
What it does: every guide hover card now names the lesson that comes next, for example "Next up, Lesson 3 (Main commands): you'll help my friend Charley...". Only a unit's last lesson points to the next unit ("That's Unit 1! Next up, Unit 2, Lesson 1 (Branches): ...").
How AI helped: Nicolas noticed Jackson seemed to talk about the next unit. Claude found why: Lessons 3 and 4 star Charley and Lily, who are also the Unit 2 and 3 guides, so the lines sounded like they were about later units. Naming the lesson fixes that.
How to explain it:
- The lines in `characters.js` are now the second half of a sentence ("you'll help my friend Charley...").
- `utils/guideNote.js` puts the next lesson's number and title in front: the lesson right after the guide's lesson, or Lesson 1 of the next unit at the end of a unit.
- Waiting guides on locked units say "First up, Lesson 1 (...)".

## PR #23: What we learned when `main` diverged (2026-11-14, Gavin)
What happened: Gavin committed the study notes update straight onto `main` instead of a branch. At the same time, Nicolas merged three PRs on GitHub. Now each `main` had commits the other one didn't, which Git calls "diverged". GitHub refused the push, and `git pull` started a merge that stopped halfway, with a long list of Nicolas's files waiting to be committed. It looked broken, but nothing was lost.
How we fixed it: we cancelled the merge, moved the commit onto its own branch, put `main` back to match GitHub, and opened a normal PR (#22).
How AI helped: Claude looked at the repo (only reading, no changes) to explain what had happened, and suggested the commands. Gavin ran every command himself.
How to explain it:
- GitHub refuses a push when its `main` has commits you don't have. Accepting it would throw away your teammate's work.
- `git pull` is really two steps: download (`fetch`), then combine (`merge`). The files in the half-done merge were Nicolas's changes coming in, not damage.
- `git merge --abort` cancels a merge that isn't finished and puts everything back to how it was before.
- `git switch -c docs/update-study-notes` makes a branch right where you are, so the commit now belongs to that branch too.
- `git branch -f main origin/main` moves the `main` label back to match GitHub. That's safe only because the commit was already saved on the new branch.
- The habit that prevents this: run `git branch` before committing. If the `*` is on `main`, make a branch first. Uncommitted changes come along when you switch.

## PR #24: Fun-fact characters on the sides (2026-11-14, Nicolas)
What it does: six pixel characters are scattered around the empty left and right sides of the home page, three in the sidebar and three under the right panel cards. Each has a small "?" above their head, and hovering over one shows a Git or GitHub fun fact.
How AI helped: Nicolas asked for characters on both sides with Git and GitHub fun facts. Claude picked six well-documented facts, placed the characters, and reused the guides' hover card.
How to explain it:
- The facts live in `content/funFacts.js`. Each one says who tells it, which side it's on, how the character stands, and the text. To add a fact, add one more item to the list.
- The facts: Git was made by Linus Torvalds in 2005 for Linux; "git" is British slang and Linus joked he names projects after himself; Git works offline because the history is on your computer; a full commit ID is 40 characters and short IDs are the first 7; GitHub launched in 2008 and Microsoft bought it in 2018 for $7.5 billion; GitHub switched new repos to "main" in 2020.
- `FunFactCharacter.jsx` is a character plus the same `CharacterCard` the guides use, with a custom `label` ("Git fun fact").
- `align` on the card ('start' or 'end') makes it open to the right in the sidebar and to the left in the right panel, so it never goes off screen.
- `.filter((fact) => fact.side === 'left')` picks which facts go in the sidebar. The right panel does the same with 'right'.
- The sidebar got `z-index: 5` so its cards show on top of the map when they open over it.

## PR #25: Unit selector and three fun facts (2026-11-14, Nicolas)
What it does: the sidebar now has a list of the three units. The one you're on is highlighted with how many lessons are done (like 2/4), and locked units show a lock. Clicking a unit scrolls the map to it. The fun facts are down to three, one per character: Jackson on the left, Charley and Lily on the right. Also fixes the sidebar scrolling away.
How AI helped: Nicolas asked for the unit selector and fewer fun facts. Claude built them, found the cause of the sidebar bug while testing the scrolling, and fixed it.
How to explain it:
- `utils/unitProgress.js` works out three things from the finished-lessons list: how many lessons of a unit are done, whether a unit is unlocked (every lesson of the unit before is done), and which unit you're on.
- `UnitSelector.jsx` draws one button per unit. Clicking runs `document.getElementById('unit-3').scrollIntoView(...)`. Each unit's section in `Home.jsx` got `id={unit.id}` so it can be found.
- `completedLessons` is passed from `App` to `AppFrame` to `Sidebar` to `UnitSelector`, so the list knows the progress.
- The sidebar bug: `position: sticky` only works inside its parent's box. Hidden hover cards were invisible but still took up room, and the one under Unit 3 stuck out below the page. The page got taller than the layout, so the sidebar ran out of room to stick. Hidden cards now use `display: none`, which takes no room at all.

## PR #26: GitHub-style progress and recent commits (2026-11-14, Nicolas)
What it does: the right column's progress card looks like a GitHub milestone ("Unit 1: GitHub Fundamentals", a bar, "75% complete · 3 done · 1 open"), with a thin whole-course bar split into the three units. A new "Recent commits" card shows your finished lessons like `git log --oneline`, newest first.
How AI helped: Nicolas chose these two ideas. Claude built them as separate components and tested them with 0 and 3 lessons finished.
How to explain it:
- `RightPanel` now gets the whole `completedLessons` list instead of two numbers from `App`, so each card can work out what it needs.
- `ProgressCard.jsx`: the unit you're on comes from `getCurrentUnitIndex`. Percent is `done / total * 100`, rounded. "Open" is `total - done`.
- The whole-course bar has one piece per unit. `flex: u.lessons.length` makes each piece as wide as its share of lessons, and the fill inside grows as you finish that unit.
- Each unit's purple is set once as a CSS variable (`--unit-color`) and used by both its bar piece and its legend dot.
- `RecentCommits.jsx`: `completedLessons` is saved in the order you finished, so `[...list].reverse()` puts the newest first. (We copy it with `[...]` first, because `reverse()` would change the original list.) `findLesson` turns each id into its hash and title, and `.slice(0, 4)` keeps the newest four.

## PR #27: Bigger logo and more even sidebar (2026-11-14, Nicolas)
What it does: the GitLingo name and moon logo in the sidebar are bigger, and the sidebar is a bit wider so everything has even room on both sides.
How AI helped: Nicolas asked for a bigger title and icon and more even spacing. Claude changed the sizes and checked the result in screenshots.
How to explain it:
- The name uses a new text size, `--text-4xl` (2.25rem), added to the list in `global.css`. The moon image went from 56px to 76px.
- The moon file has empty room around it for the glow, so a small negative `margin-left` lines the moon up with the boxes below it.
- In `AppFrame.css`, the first grid column (the sidebar) went from 256px to 280px.

## PR #29: Remove unused files (2026-11-14, Nicolas)
What it does: deletes `src/content/upcoming-units.json` (replaced by Gavin's unit files) and `src/utils/.gitkeep` (the folder has real files now).
How AI helped: Claude checked that nothing used them. Nicolas ran the `git rm` himself.
How to explain it: `git rm` deletes a file and stages that deletion in one step, so the next commit removes it from the repo.

## PR #30: Components grouped into folders (2026-11-14, Nicolas)
What it does: the components Nicolas made now live in three folders instead of one long list: `layout/` (the frame and side columns), `map/` (lesson buttons and the path line) and `characters/` (Jackson, Charley, Lily and their cards). `Icon.jsx` stays shared in `components/`, and Gavin's `Hearts.jsx` stays where it is until the lesson screen gets its own `lesson/` folder.
How AI helped: Claude moved the files with `git mv` and fixed every import path with a small script, then checked the app built after each folder and looked the same.
How to explain it:
- `git mv` moves a file and keeps its history, so `git log --follow` still shows every change it ever had.
- Moving a file one folder deeper means its imports need one more `../`. For example `'../content/characters.js'` became `'../../content/characters.js'`.
- Nothing about how the app works changed. Only where files live and the import lines that point to them.

## PR #32: One component for a unit's path (2026-11-14, Nicolas)
What it does: moves everything that draws one unit on the map (banner, path line, lesson buttons, guide) out of `Home.jsx` into `components/map/UnitPath.jsx`. Unit 1 looks exactly the same. This is groundwork so Units 2 and 3 can use the same piece.
How AI helped: Claude did the move and checked with screenshots that nothing changed.
How to explain it:
- A component you can reuse: `<UnitPath unit={unit1} unitIndex={0} ... />` draws one unit. Next we can loop over all units and draw one `UnitPath` each.
- `getLessonStatus` (done, current or locked) moved into `utils/unitProgress.js`, next to the other progress rules, since it's a plain function and not drawing.
- `getGuideNote(unitIndex, ...)` now gets the real unit number instead of a fixed 0, so it works for any unit.

## PR #33: Unit 2 on the map (2026-11-14, Nicolas)
What it does: Unit 2 now shows its full lesson path under Unit 1, with Charley as its guide. It stays locked (grey, dashed line, "Finish Unit 1 to unlock") until every Unit 1 lesson is done. Then Branches becomes the current lesson and Charley points at it with a speech bubble.
How AI helped: Claude built it on top of the UnitPath component. Nicolas approved Charley's four lines, which come from the "Welcome back" cards in `docs/lessons/unit-2/`.
How to explain it:
- `isUnitUnlocked` (in `utils/unitProgress.js`) says a unit opens once every lesson of the unit before it is done. `UnitPath` asks it for its own unit.
- `getLessonStatus` got one more input, `unitUnlocked`. In a locked unit, no lesson can be "current", so they all show as locked.
- A locked unit passes `reachedIndex={0}` to the path line, so the whole line is dashed.
- `UnitGuide` has a `waiting` mode: standing, grey, no speech bubble. Its hover card uses the "First up, Lesson 1" text.
- `guide.says?.[lesson.id]`: the `?.` means "if `says` exists". Lily has no lines yet, so this keeps the app from crashing.
- `Home.jsx` draws `units.slice(0, 2)` as paths. Unit 3 is still the old card until the next PR.

## PR #31: Shared units list and guide lines in characters.js (2026-11-14, Gavin)
What it does: lessons from any unit can now open, not just Unit 1. Everything the guides say on the map moved out of the lesson files and into `characters.js`. Nothing on screen looks different.
How AI helped: Gavin took on items #1 and #3 from our cleanup list. Claude made both changes, and Gavin tested and committed them as two commits.
How to explain it:
- `App.jsx` used to search only `unit1.lessons`, so a Unit 2 lesson would never be found. Now `units.flatMap((unit) => unit.lessons)` joins every unit's lessons into one list before searching.
- `const [unit1, ...upcomingUnits] = units` is destructuring: the first item gets the name `unit1`, and `...` collects the rest.
- Why we moved the guide lines: both of us kept editing the same unit JSON files (Gavin for lessons, Nicolas for what the guides say), which caused merge conflicts. Now the unit JSON is lesson content only (Gavin), and `characters.js` is everything the guides say (Nicolas).
- `UNIT_GUIDES` says which character guides which unit. `CHARACTERS[UNIT_GUIDES[unit.id]]` finds the guide in two steps: unit id, then character name, then that character's info.
- `says` is keyed by lesson id, not by position, so reordering lessons can't mix up the lines.

## PR #36: One file per lesson (2026-11-14, Gavin)
What it does: each unit used to be one big JSON file of about 350 lines. Now every unit is a folder with a small `unit.json` (id, number, title) and one file per lesson: `src/content/units/unit-1/lessons/lesson-1.json` and so on. The text of every lesson is exactly the same as before, and nothing on screen changed.
Why we made this decision (the problem): big shared files were our main source of merge conflicts. Two people changing two different lessons were still editing the same file, and a PR that changed one lesson showed a 350-line file.
How AI helped: Nicolas wrote the plan. Gavin changed two parts of it (below). Claude split the files with a small script that copied each lesson's lines exactly, rewrote `content/index.js`, and checked the result was identical to the old files. Gavin tested and committed each step.
How to explain it:
- Now two people editing two lessons never touch the same file, and the folder path tells you exactly which unit and lesson a file is.
- `content/index.js` uses `import.meta.glob`, a Vite feature that loads every file matching a pattern, like `./units/unit-*/lessons/lesson-*.json`. A new lesson or unit is just a new file or folder. Nothing has to be added to `index.js` by hand.
- `eager: true` loads the files right away, like a normal import. `import: 'default'` gives us the JSON data itself.
- Lessons are sorted by the number in their name, not by text. As text, `lesson-10` would come before `lesson-2`.
- `index.js` still gives the rest of the app the same `units` list as before (`{ id, number, title, lessons }`), so no screen or component had to change. Keeping that the same was our rule for the whole change.
- The trade-off: `import.meta.glob` is less obvious than writing out each import, so whoever reads `index.js` needs to know what it does. The comments in the file explain it.
- What we changed from the plan: the plan had a folder for each lesson (`lesson-1/lesson.json`). We used one file per lesson instead, because each folder would only ever hold one file. We'd only switch to folders if lessons got extra files like images. We also skipped the blank lesson template, because we won't add new lessons in the time we have.
## PR #34: Charley's bubble no longer covers the title (2026-11-14, Nicolas)
What it does: Charley stands a bit lower on the map, so at Unit 2 Lesson 1 his speech bubble doesn't overlap the "GitHub Advanced" title.
How AI helped: Nicolas spotted the overlap. Claude lowered Charley and checked it in screenshots.
How to explain it: each guide now gets a class with their name (like `unit-guide--charley`), so CSS can move just one character. Charley is taller than Jackson and Lily, so his `bottom` is 26px instead of 58px.

## PR #35: Unit 3 on the map (2026-11-14, Nicolas)
What it does: Unit 3 now shows its full lesson path with Lily as its guide, locked until Unit 2 is done. All three units are drawn the same way, and the old "Coming soon" card is gone. Lily has a speech-bubble line for each Unit 3 lesson. The lessons README now names Unit 3 Lesson 4 as the one late-night moment.
How AI helped: Claude built it on top of UnitPath and checked every line against `docs/lessons/unit-3/`. Nicolas approved Lily's lines and asked to update the README so the docs agree with each other.
How to explain it:
- `Home.jsx` is now just `units.map(...)`, one `UnitPath` per unit. A fourth unit would show up on the map without changing `Home.jsx`.
- Lily's lines live in `characters.js` under `says`, keyed by lesson id (`u3-l1`...), like Jackson's and Charley's.
- The README said "No late-night story", but Unit 3 Lesson 4 starts at a late study session. The rule now says there's no late-night storyline, and names that lesson as the one late-night moment.

## PR #37: Right column scrolls and fun-fact cards stay on screen (2026-11-14, Nicolas)
What it does: the right column now scrolls with the page, so Charley and Lily at its bottom can be reached. Their fun-fact cards open above them instead of below, and only one character card shows at a time.
How AI helped: Nicolas spotted the cards going off screen. Claude found the cause (the column was sticky but taller than the screen) and tested the fix on an 800px tall window.
How to explain it:
- `position: sticky` keeps something pinned while you scroll, but if it's taller than the window, its bottom part can never be seen. Removing it lets the column scroll like the rest of the page.
- `above` on `CharacterCard` swaps `top: 100%` for `bottom: 100%`, so the card sits over the character instead of under it.
- `:focus-within` kept a card open after a mouse click. `:focus-visible` only matches keyboard focus (Tab), so clicking no longer leaves a card stuck open, but keyboard users can still read every card.

## PR #39: Right column stays in view on any screen (2026-11-14, Nicolas)
What it does: the right column stays pinned while you scroll the map (great on Gavin's big monitor), and if it's taller than the window, it scrolls by itself so nothing is cut off on a laptop.
How AI helped: Gavin noticed the column scrolled away on a big monitor. Claude planned it as one commit and tested it at 1920x1200, 1440x900 and 1440x800.
How to explain it:
- `position: sticky; top: 0` pins the column. `max-height: 100vh` stops it from being taller than the window, and `overflow-y: auto` gives it its own scrollbar only when it needs one.
- A box that scrolls by itself cuts off anything sticking out of it. So the fun-fact cards now line up with the whole row of characters (`position: static` on each character) instead of with one character, and they always fit inside.
- The "?" above each character went from `position: absolute` to normal layout, so it stays above its own character.

## PR #40: Lesson frame and teaching cards (2026-11-14, Nicolas)
What it does: opening a lesson now shows the real lesson screen: a top bar (✕ to quit, a progress bar, hearts), the lesson's teaching cards one at a time, and a CONTINUE button at the bottom. Questions and the welcome card show a "coming soon" screen until their own PRs.
How AI helped: Claude built PR 1 of the Unit 1 plan. Study notes used: section 3 (the lesson keeps its state in a few useState values, and the progress bar is a width that changes with a transition).
How to explain it:
- `getLessonSteps(lesson)` (Gavin's) turns a lesson file into one list of screens. `Lesson.jsx` keeps one number, `stepIndex`, and CONTINUE adds 1.
- The progress bar is `stepIndex / steps.length`, so it fills as you go and is full after the last screen.
- `CodeText` uses Gavin's `splitCode` to show anything in backticks in the code font.
- `Diagram` checks if the text looks like `[ box ] --label--> [ box ]`. If it does, it draws real boxes and arrows. If not (hand-drawn ones like the Unit 2 branch picture), it shows the text as is so the spacing stays right.
- `TeachingCard` shows the title and paragraphs, plus a diagram, bullets or footer only if the card has them.
- `Hearts` moved into `components/lesson/`, where every lesson piece lives now.

## PR #41: Multiple-choice questions and hearts (2026-11-14, Gavin)
What it does: multiple-choice questions now work. You pick an option and press CHECK. A green bar says "Correct!", or a red bar says "Not quite." with the explanation. After CHECK, the right answer turns green (and a wrong pick turns red), so you always see the correct answer. A wrong answer costs one of your 3 hearts, and CONTINUE moves on either way (no retries).
How AI helped: this is PR 2 of the lesson screen plan. Claude wrote `FeedbackBar`, `MultipleChoice` and the changes to `Lesson.jsx` at Gavin's request. Gavin tested and committed each step.
How to explain it:
- `Lesson.jsx` keeps three pieces of state: `hearts` (starts at 3), `picked` (the chosen option's position, or `null`) and `checked` (whether CHECK was pressed). They live in `Lesson.jsx`, the parent, because the top bar, the question and the bottom bar all need them. That's called "lifting state up".
- `MultipleChoice` and `FeedbackBar` only draw things and report clicks. They never decide if an answer is right. `Lesson.jsx` does that with `picked === step.correctIndex`.
- CHECK is `disabled` until something is picked, so you can't check an empty answer.
- `checkAnswer()` sets `checked` to true and takes a heart if the answer is wrong. `Math.max(0, hearts - 1)` stops hearts from going below 0.
- `goToNextStep()` resets `picked` and `checked` before moving on. Without that, the next question would start with an answer already chosen.
- `checked ? <FeedbackBar /> : <footer>` shows one or the other: the feedback bar replaces the bottom bar after CHECK.
- `getOptionState` gives each option one of five looks (idle, picked, correct, wrong, faded). Each look only changes one CSS variable, `--choice-color`, and the border, shadow and number badge all use it. `FeedbackBar` does the same with `--feedback-color`.
- `color-mix()` blends a little green or red into the dark background, so the colors come from our variables and the text stays readable.
- Accessibility: `aria-pressed` tells screen readers which option is chosen, `role="status"` reads the result out loud, and `autoFocus` puts the keyboard on CONTINUE.
- For now hearts can run out with no "Out of hearts" screen. That comes in PR 4 (end screens).

## PR #42: Practice terminal (2026-11-14, Gavin)
What it does: terminal questions now work. You type a Git command into a pretend terminal and press Enter (or CHECK). A right answer prints the command's output, like `git version 2.47.0`, and shows the green bar. A wrong answer keeps what you typed, costs a heart, and the red bar says "Not quite. The answer is `git --version`". Nothing you type ever really runs.
How AI helped: this is PR 3 of the lesson screen plan. Claude wrote `PracticeTerminal` and the changes to `Lesson.jsx` at Gavin's request, and tested all 23 terminal questions in our lesson files against the answer checker. Gavin tested and committed each step.
How to explain it:
- It follows the same pattern as multiple choice: `Lesson.jsx` keeps a new piece of state, `typed` (the text in the box). `PracticeTerminal` only shows things and reports typing (`onType`) and Enter (`onSubmit`). It never decides if an answer is right.
- The input sits inside a `<form>`, so pressing Enter submits it for free. `event.preventDefault()` stops the page from reloading, which is what a form normally does.
- `isAnswerCorrect` (from our helpers PR) ignores extra spaces but not uppercase letters, because Git names are case-sensitive. That's also why the input turns off `autoCapitalize`, `autoCorrect` and `spellCheck`: a phone turning `git` into `Git` would make a right answer wrong.
- Three small rule functions in `Lesson.jsx` work for both question types, so the rest of the file doesn't care which type it is: `hasAnswer` (is CHECK allowed yet?), `getIsRight` (positions for multiple choice, `isAnswerCorrect` for the terminal) and `getWrongMessage`.
- Terminal questions have no `wrongFeedback` in the lesson files, so the red bar shows the first accepted answer, `acceptedAnswers[0]`.
- `showOutput = checked && isRight`: output only appears after CHECK, and only for a right answer, like a command that worked. Some commands really print nothing (like `git config`), so `fakeOutput` can be empty.
- `startingHistory` lines can have a `color` (`red` or `green`), because real Git shows changed files in red and staged files in green. `white-space: pre-wrap` keeps the spaces inside lines like `        modified:   app.py`.
- Pasting works on its own, because it's a normal `<input>`. Lesson 4 has you paste Lily's URL from her profile card.

## PR #43: Finishing a lesson (2026-11-14, Nicolas)
What it does: a lesson now ends on a real "Lesson complete!" screen, and its CONTINUE saves the lesson, so the next one unlocks, the guide moves on and it shows in Recent commits. Losing the last heart shows "Out of hearts", and TRY AGAIN starts the lesson over. The "Finish lesson (test)" button is gone.
How AI helped: Claude built PR 4 of the Unit 1 plan on top of Gavin's question PRs, and played Lesson 1 in Chrome twice (all right, then 3 wrong) to check both endings.
How to explain it:
- When `stepIndex` goes past the last screen, `Lesson.jsx` shows `LessonComplete`. Its CONTINUE calls `onFinish`, which `App.jsx` already had: `completeLesson(id)` saves to localStorage and goes back to the map.
- Out of hearts is worked out, not stored: `hearts === 0 && !checked`. The `!checked` part means you still see the red bar for the answer that cost the last heart, and the end screen comes after its CONTINUE.
- `restart()` puts every piece of state back to the start: step 0, 3 hearts, no answer.
- Both end screens share `EndScreen.css`. The check badge "pops" with a small CSS animation that's turned off for people who turn off animations in their system settings.

## PR #44: Lessons with a demo user (2026-11-14, Nicolas)
What it does: Lessons 2–4 (and every Unit 2 and 3 lesson) now start with a "Meet your user" card. The installing Git card has Windows / Mac / Linux tabs. During questions, a profile card on the right shows the user's info, and long values like Lily's GitHub URL have a Copy button. The "coming soon" screen is gone.
How AI helped: Claude built PR 5 of the Unit 1 plan and checked Lessons 2 and 4 and Unit 3 Lesson 1 in Chrome, on a wide and a narrow window.
How to explain it:
- `MeetUserCard` reads `lesson.user`. The title is `welcomeTitle` if the lesson has one (Units 2–3), or "Meet " plus the name. The sprite comes from the user's first name ("Jackson Stark" → `jackson` in characters.js).
- `OsTabs` keeps one number, `openIndex`, and only shows that tab's text. `TeachingCard` shows it only if the card has `tabs`.
- `ProfileCard` shows every field. A field with `copyable: true` gets a Copy button that uses Gavin's `copyText`. It says "Copied!" or "Couldn't copy" for 2 seconds, then goes back to "Copy" (a `setTimeout`).
- In `Lesson.jsx`, `showProfile` is true on questions in lessons that have a user, and the body switches to two columns.

## PR #45: Back button inside a lesson (2026-11-15, Gavin)
What it does: a BACK button shows the screen before the one you're on. It's hidden on the first screen. Questions you already checked come back locked, with your answer and the green or red bar, so going back and forth never changes your hearts. The progress bar moves back too.
How AI helped: this is PR 7 of the lesson screen plan. Claude wrote it at Gavin's request. The plan had 5 commits, including a new `answered` prop for `MultipleChoice` and `PracticeTerminal`. Claude noticed both components already show a locked answer when `checked` is true, so we reused that and did it in 3 commits instead. Claude also noticed `FeedbackBar` needed its own BACK button, which the plan didn't mention.
How to explain it:
- `Lesson.jsx` has a new `answers` object that remembers every checked answer by screen number, like `{ 4: { picked: 0, typed: '' } }`. CHECK saves the answer there.
- `checked` is no longer its own state. It's worked out each time: "does this screen have a saved answer?" Don't store what you can calculate: two things that have to stay in sync are how bugs happen.
- `draftPicked` and `draftTyped` hold the answer you're working on before CHECK. On a checked screen, the saved answer is shown instead.
- `{ ...answers, [stepIndex]: {...} }` copies the saved answers and adds one. We make a new object instead of changing the old one, because React only notices state changes when it gets a new object.
- Hearts can't be won back: a screen with a saved answer is locked, so it can never be checked again.
- `goBack()` clears the draft and goes back one screen. A pick that wasn't checked is only a draft, so it's thrown away.
- BACK is hidden on the first screen and once the last heart is gone (then the lesson is over, and CONTINUE goes to Out of hearts).
- After CHECK, `FeedbackBar` replaces the bottom bar, so it got its own optional BACK (`onBack`). Without it you could go back to an answered question but never past it.
- TRY AGAIN clears `answers`, so every question can be answered again.

## PR #47: Review finished lessons (2026-11-15, Nicolas)
What it does: the ✓ circles on the map can be clicked now. A finished lesson opens in review mode: a "Review" label replaces the hearts, wrong answers cost nothing, and the end shows "Review finished" with Back to map. Nothing is saved, so progress, Recent commits and the guide stay the same.
How AI helped: Claude built PR 8 of the plan on top of Gavin's back button, and tested it in Chrome (a finished lesson with 4 wrong answers, then checked the saved progress didn't change).
How to explain it:
- `LessonBubble` used to only let the current lesson be clicked. Now anything that isn't locked can be (`canOpen`).
- `App.jsx` works out review mode with one line: `completedLessons.includes(openLessonId)`. If you already finished it, it's a review. It passes `review` to `Lesson`.
- In `Lesson.jsx`, `checkAnswer` only takes a heart if `!review`, so hearts stay at 3 and Out of hearts can never show.
- Every review starts with an empty `answers` list, so all the questions can be answered again. We didn't need to change `MultipleChoice` or `PracticeTerminal`.
- After the last screen, a review shows `ReviewFinished`, which calls `onBack`, not `onFinish`, so nothing is saved.

## PR #46: A full README (2026-11-15, Gavin)
What it does: replaces the 3-line README with what judges and new readers need: what GitLingo does, the live link, how to run it locally, how it's built, the main decisions we made and why, how we used AI, and who did what.
How AI helped: Claude drafted the README from our code, our understanding log and the git history. We checked it for accuracy, especially the Team and "How we used AI" sections, before merging.
How to explain it:
- The README is the first thing anyone sees on GitHub, so it answers the basic questions: what is this, can I try it, how does it work, who made it.
- "Decisions we made (and why)" lists real choices with their reasons, like case-sensitive answers and one file per lesson. These are the things we can talk about when someone asks why we built it this way.
- "How we used AI" is required by our CLAUDE.md. It says honestly what Claude did (tutor, reviewer, and writing code we asked for) and what we did (decisions, testing, commits, reviewing each other's PRs), and points to this log for details.

## PR #48: README screenshots and future improvements (2026-11-15, Gavin)
What it does: adds two screenshots of the live site to the README (the map and a lesson question), and turns the old "out of scope" line into a "Future improvements" section with 8 ideas, each with a short reason.
How AI helped: Gavin took the screenshots and chose to add the section. Claude wrote the list of ideas and the image descriptions.
How to explain it:
- `![description](docs/screenshot-map.png)` is how Markdown shows an image. The text in the brackets is read out by screen readers and shows if the image can't load.
- The future ideas follow from what we built: more units and a merge conflict simulator (the hardest part for us), a light theme (easy because every color is a CSS variable), and accounts (would need a backend, which we left out on purpose).

## PR #49: Land on the lesson you're working on (2026-11-15, Nicolas)
What it does: coming back to the map after a lesson (finished or quit with ✕), it slides to your glowing current lesson instead of starting at the top. Someone brand new, or someone who finished everything, stays at the top.
How AI helped: Claude built PR 9 of the plan and checked it in Chrome with different amounts of progress (new player, Unit 1 done, halfway through Unit 2, everything done).
How to explain it:
- `Home.jsx` has a `useEffect`, code that runs right after the map shows up on screen. Every time you come back from a lesson the map is shown again, so it runs again.
- `useRef` gives us the map's `<div>`, and `querySelector('.lesson-bubble--current')` finds the glowing lesson inside it.
- `scrollIntoView({ block: 'center' })` is built into the browser. It scrolls the page until that element is in the middle of the screen.
- If nothing is finished yet we skip it, so a new player sees the top of the page first. If everything is finished there's no current lesson, so nothing happens.
