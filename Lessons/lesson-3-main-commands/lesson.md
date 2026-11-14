# Lesson 3: Main commands

**Status:** ✅ Written
**Structure:** "Meet your user" card → 4 teaching cards → 2 multiple choice → 2 terminal
**This is the core lesson of the demo.**

---

## Demo user: Charley Dunkel

| Field | Value |
|---|---|
| Name | Charley Dunkel |
| Project folder | `weather-app` |
| File | `app.py` |
| Commit message | Add weather app |

### "Meet your user" card
> **Meet Charley Dunkel**
> Charley just built a small weather app for a class project. Now Charley wants to start saving it with Git, so nothing gets lost.
>
> Project folder: weather-app
> File: app.py
>
> You'll be typing commands as Charley.
>
> **[ Let's go ]**

---

## Teaching cards

### Card 1: Saving in Git takes steps
> In a game, you hit save once. In Git, saving is a few steps, so you get to choose exactly what goes into each snapshot. Think of it like packing a box: first you put things in, then you seal it and write a label.
>
> `[ Your files ]  ──git add──▶  [ Ready to save ]  ──git commit──▶  [ Snapshot saved ✓ ]`

### Card 2: `git init`: turn Git on
> Git doesn't watch every folder on your computer. You have to turn it on for each project. Run `git init` inside a project folder, and Git starts tracking it. You only do this once per project.

### Card 3: `git status`: check what's going on
> `git status` shows what changed and what's ready to save.
> - **Red** files: changed, but not ready to save yet
> - **Green** files: ready to save
>
> It never changes anything, so use it whenever you're unsure.

### Card 4: `git add` and `git commit`: pack and seal
> - `git add .` puts every change in the folder into the box. The dot means "everything here."
> - `git commit -m "message"` seals the box and saves the snapshot. The message describes what you changed.

---

## Questions

### Q1: Multiple choice
**Question:** Charley's `weather-app` folder isn't tracked by Git yet. Which command starts tracking it?

1. `git start`
2. `git commit`
3. **`git init`** ✓

**Wrong feedback:** Not quite. `git init` turns Git on for a folder. You only need it once per project.

### Q2: Multiple choice
**Question:** What does `git status` do?

1. Saves a snapshot
2. **Shows what changed and what's ready to save** ✓
3. Uploads your project to GitHub

**Wrong feedback:** Not quite. `git status` shows what changed and what's ready to save. It never changes anything.

### Q3: Terminal
**Prompt:** Charley's `app.py` shows up in red. Get all of Charley's changes ready to save.

**Starting history** (already shown in the terminal when the question opens):
```
$ git init
Initialized empty Git repository in /weather-app/.git/
$ git status
Untracked files:
        app.py                ← shown in RED
$ █
```

**Accepted answers:**
- `git add .`
- `git add -A`
- `git add --all`
- `git add app.py` *(valid, since it's the only file)*

**Fake output:** *(none, matching the real command: "no news is good news" from Lesson 2)*

**Wrong feedback:** Not quite. The answer is `git add .`

### Q4: Terminal
**Prompt:** `app.py` is green now. Save the snapshot using the commit message on Charley's profile card.

**Starting history:**
```
$ git status
Changes to be committed:
        new file:   app.py    ← shown in GREEN
$ █
```

**Accepted answers:**
- `git commit -m "Add weather app"`
- `git commit -m 'Add weather app'`

**Fake output:**
```
[main (root-commit) a1b2c3d] Add weather app
 1 file changed, 24 insertions(+)
 create mode 100644 app.py
```

**Wrong feedback:** Not quite. The answer is `git commit -m "Add weather app"`

---

## Notes

- **Starting history** is new here: the terminal opens with earlier commands already shown. It puts `git init` and `git status` (taught in multiple choice) in real context, and shows `app.py` going **red → green** across the two questions, so the user *sees* staging happen.
- `git init` and `git status` are covered by multiple choice, so all four main commands appear in the lesson.
- The commit message is matched exactly (case-sensitive). It's shown on the profile card.
- The "packing a box" analogy (add = put in, commit = seal + label) is used in Cards 1 and 4 and the wrong-answer messages.
- Correct answers sit in positions 3 and 2, so there's no pattern.
