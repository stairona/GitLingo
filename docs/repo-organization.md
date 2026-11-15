# Repo Organization

```
hackathon-project/
├── README.md               # what it is, how to run, team, live link
├── CLAUDE.md               # shared rules for Claude Code in this repo
├── .gitignore              # files Git skips: node_modules, dist, .env, .DS_Store, ...
├── .oxlintrc.json          # settings for oxlint, the tool that checks our code for mistakes
├── package.json            # dependencies and scripts (comes with Vite)
├── package-lock.json       # exact versions npm installed, so we both get the same ones
├── vite.config.js          # Vite settings
├── index.html              # the one HTML page the React app loads into
├── public/                 # favicon.svg and gitlingo-logo.svg
├── docs/                   # planning and notes, no code
│   ├── ideas.md
│   ├── gitlingo-outline.md
│   ├── tools.md
│   ├── repo-organization.md
│   ├── react-duolingo reverse engineering.md
│   ├── understanding-log.md        # how to explain every PR
│   ├── screenshot-map.png          # screenshots used in the README
│   ├── screenshot-lesson.png
│   └── lessons/
│       ├── README.md       # UX decisions for every lesson
│       ├── unit-1/         # one write-up per lesson
│       ├── unit-2/
│       └── unit-3/
└── src/                    # all the app code
    ├── main.jsx            # starts the app
    ├── App.jsx             # switches between screens (home or lesson)
    ├── styles/global.css   # midnight theme colors as CSS variables
    ├── content/
    │   ├── index.js        # finds every unit and lesson file by itself
    │   ├── characters.js   # pixel art for the fun fact characters
    │   ├── funFacts.js     # the fun facts the characters tell
    │   └── units/unit-N/   # unit.json, plus lessons/lesson-N.json (one file per lesson)
    ├── hooks/              # useProgress: which lessons are done (localStorage)
    ├── utils/              # small helpers like checking terminal answers
    ├── components/         # reusable pieces, grouped by where they show up
    │   ├── Icon.jsx        # the small line icons
    │   ├── layout/         # page frame: Sidebar, RightPanel, ProgressCard, ...
    │   ├── map/            # the lesson path: LessonBubble, PathLine, UnitPath
    │   ├── lesson/         # lesson screens: TeachingCard, PracticeTerminal, Hearts, ...
    │   └── characters/     # pixel characters and their fun fact cards
    └── pages/              # full screens: Home (the map) and Lesson
```

Most components have their own `.css` file right next to them.

## Why it's organized this way

- Content is separate from code. One of us can write lessons in `src/content/` while the other builds screens in `components/` and `pages/`, so we rarely edit the same files.
- Lessons are written in plain words first in `docs/lessons/unit-N/`, then copied into JSON for the app.
- Adding a lesson means adding one JSON file. `src/content/index.js` finds it on its own, so no other code changes.
- Each folder has one job, so we (and Claude) always know where something belongs.
- Planning notes stay in `docs/`, away from the app code.

One line for the judges: lessons are data, the UI is components, and progress is saved in the browser.
