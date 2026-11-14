hackathon-project/
├── README.md              # what it is, how to run, team, demo link
├── .gitignore             # node_modules, dist, .env, .DS_Store
├── docs/                   # the current "initial stuff" moves here
│   ├── ideas.md
│   ├── gitlingo-outline.md
│   └── tools.md
├── package.json           # Vite + React (created by scaffolding)
├── vite.config.js
├── index.html
├── public/                # static assets (logo, favicon)
└── src/
    ├── main.jsx           # entry point
    ├── App.jsx            # routes: home, unit, lesson
    ├── components/        # reusable UI: LessonCard, Quiz, ProgressBar, Hearts, XPBadge
    ├── pages/             # Home (unit map), Lesson, Profile
    ├── content/           # lesson data, no code
    │   ├── unit1-fundamentals.json
    │   ├── unit2-advanced.json
    │   └── unit3-theory.json
    ├── hooks/             # useProgress (localStorage: XP, streak, hearts)
    └── styles/            # global.css with theme variables



    Repo Organization

Top level
- README.md: what the project is, how to run it, who is on the team, and the demo link
- .gitignore: files Git should skip (node_modules, dist, .env, .DS_Store)
- package.json: the project dependencies and scripts (Vite and React), created when we scaffold
- vite.config.js: settings for the Vite dev server and build tool
- index.html: the single HTML page that the whole React app loads into
- public folder: static files served as they are, like the logo and favicon

docs folder (planning and notes, not code)
- ideas.md: brainstorming
- gitlingo-outline.md: the three unit course outline
- tools.md: the tools table

src folder (all the app code)
- main.jsx: the entry point that starts the app
- App.jsx: sets up the routes (home, unit, lesson)
- components folder: reusable UI pieces like LessonCard, Quiz, ProgressBar, Hearts and XPBadge
- pages folder: full screens: Home (the unit map), Lesson and Profile
- content folder: the lesson data as JSON, with no code, one file per unit
- hooks folder: useProgress saves XP, streak and hearts in localStorage
- styles folder: global.css with the theme variables (dark mode colors)

Why it is organized this way
- Content is separate from code. One person can write lessons in the content folder while the other builds the UI in components and pages, so you rarely touch the same files.
- Each folder has one job, so you and your Claude Code sessions always know where things belong.
- The docs folder keeps planning notes out of the app code.

One line version for judges: Lessons are data, the UI is components, and progress is saved in the browser.