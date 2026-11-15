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

## PR #34: Charley's bubble no longer covers the title (2026-11-14, Nicolas)
What it does: Charley stands a bit lower on the map, so at Unit 2 Lesson 1 his speech bubble doesn't overlap the "GitHub Advanced" title.
How AI helped: Nicolas spotted the overlap. Claude lowered Charley and checked it in screenshots.
How to explain it: each guide now gets a class with their name (like `unit-guide--charley`), so CSS can move just one character. Charley is taller than Jackson and Lily, so his `bottom` is 26px instead of 58px.
