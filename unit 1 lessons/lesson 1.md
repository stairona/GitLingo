# Lesson 1: Git vs GitHub

**Status:** ✅ Written
**Demo user:** none (this lesson is about concepts, not a personal setup)
**Structure:** 4 teaching cards → 2 multiple choice → 2 terminal

---

## Teaching cards

### Card 1: What is Git?
> Git is a tool that runs on your computer and tracks changes to your files. Each time you save a snapshot, Git remembers exactly what your project looked like at that moment. Break something later? Jump back to a snapshot. Think of it like save points in a game.

### Card 2: What is GitHub?
> GitHub is a website that stores your Git projects online. It's where you back up your work, share it, and build things with other people. If Git is your save file, GitHub is the cloud save.

### Card 3: How they fit together
> Git does the tracking on your laptop. GitHub is where you upload it. You can use Git without GitHub, but GitHub is built on top of Git.
>
> `[ 💻 Your laptop: Git ]  ──upload──▶  [ ☁️ GitHub ]`

### Card 4: Talking to Git
> You give Git instructions by typing commands into a terminal. Every Git command starts with `git`. Two useful first commands:
> - `git --version`: checks that Git is installed
> - `git help`: lists the most common commands

---

## Questions

### Q1: Multiple choice
**Question:** Which one works on your computer without internet?

1. **Git** ✓
2. GitHub
3. Both
4. Neither

**Wrong feedback:** Not quite. Git runs on your computer. GitHub is a website, so it needs internet.

### Q2: Multiple choice
**Question:** You want to share your project with a teammate. Where should you put it?

1. Git
2. **GitHub** ✓
3. Your terminal

**Wrong feedback:** Not quite. GitHub stores your project online so others can see it.

### Q3: Terminal
**Prompt:** Check that Git is installed.

**Accepted answers:**
- `git --version`
- `git version`

**Fake output:**
```
git version 2.47.0
```

**Wrong feedback:** Not quite. The answer is `git --version`

### Q4: Terminal
**Prompt:** Ask Git to list its most common commands.

**Accepted answers:**
- `git help`
- `git --help`

**Fake output:**
```
These are common Git commands:
   init      Start tracking a folder
   add       Stage changes to be saved
   commit    Save a snapshot
   push      Upload to GitHub
```

**Wrong feedback:** Not quite. The answer is `git help`

---

## Notes

- Q4's output is simplified on purpose. Real `git help` output is long and intimidating, and this version previews Lessons 3 & 4.
- The game analogies (save points, cloud save) tie into the Games track without needing a story.
- Answer order is fixed. Correct answers are in different positions (1st, 2nd) so there's no pattern.
- Wrong-answer messages explain *why*, not just *what*.
