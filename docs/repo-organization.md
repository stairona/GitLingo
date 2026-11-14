# Repo Organization

```
hackathon-project/
├── README.md               # what it is, how to run, team, live link
├── CLAUDE.md               # shared rules for Claude Code in this repo
├── .gitignore              # node_modules, dist, .env, .DS_Store
├── package.json            # dependencies and scripts (comes with Vite)
├── vite.config.js          # Vite settings
├── index.html              # the one HTML page the React app loads into
├── public/                 # static files like the favicon
├── docs/                   # planning and notes, no code
│   ├── ideas.md
│   ├── gitlingo-outline.md
│   ├── tools.md
│   ├── repo-organization.md
│   ├── study-notes.md
│   ├── understanding-log.md
│   └── lessons/
│       ├── README.md       # UX decisions for every lesson
│       └── unit-1/         # one write-up per lesson
└── src/                    # all the app code
    ├── main.jsx            # starts the app
    ├── App.jsx             # switches between screens (home or lesson)
    ├── styles/global.css   # midnight theme colors as CSS variables
    ├── content/unit-1/     # lesson data as JSON, one file per lesson
    ├── hooks/              # useProgress: which lessons are done (localStorage)
    ├── utils/              # small helpers like checking terminal answers
    ├── components/         # reusable pieces: LessonBubble, ProgressBar, Hearts, ...
    └── pages/              # full screens: Home (the map) and Lesson
```

The `package.json`, `vite.config.js`, `index.html`, `public/` and `src/` parts arrive when we set up the app.

## Why it's organized this way

- Content is separate from code. One of us can write lessons in `src/content/` while the other builds screens in `components/` and `pages/`, so we rarely edit the same files.
- Lessons are written in plain words first in `docs/lessons/unit-1/`, then copied into JSON for the app.
- Each folder has one job, so we (and Claude) always know where something belongs.
- Planning notes stay in `docs/`, away from the app code.

One line for the judges: lessons are data, the UI is components, and progress is saved in the browser.
