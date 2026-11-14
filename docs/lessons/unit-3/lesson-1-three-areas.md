# Unit 3, Lesson 1: The three areas

**Status:** ✅ Written
**Structure:** "Welcome back" card → 4 teaching cards → 4 questions **in workflow order** (multiple choice → terminal → terminal → multiple choice)

---

## Demo user: Charley Dunkel (returning)

| Field | Value |
|---|---|
| Name | Charley Dunkel |
| Project folder | `weather-app` |
| Changed files | `app.py` (a bug fix), `notes.txt` (personal notes, not ready to save) |

### "Welcome back" card
> **Charley's back, with a choice to make.**
> Charley fixed a bug in `app.py`, and also scribbled some messy notes in `notes.txt`. Only the bug fix should go in the next snapshot. Time to find out how Git lets you choose.
>
> Project folder: weather-app
> Changed: app.py, notes.txt
>
> You'll be typing commands as Charley.
>
> **[ Let's go ]**

---

## Teaching cards

### Card 1: Git has three areas
> Remember packing a box in Unit 1? Each step has a real name:
> - **Working directory**: the files on your laptop that you edit
> - **Staging area**: the box, holding the changes you picked for the next snapshot
> - **Repository**: your saved snapshots, kept in the hidden `.git` folder
>
> `[ Working directory ]  ──git add──▶  [ Staging area ]  ──git commit──▶  [ Repository ]`

### Card 2: Why have a staging area?
> The staging area lets you **choose**. If you changed two files but only one is ready, stage just that one. The snapshot will contain only what you put in the box.

### Card 3: `git status` shows the areas
> Now you know what red and green in `git status` really mean:
> - **"Changes to be committed"** (green): in the **staging area**
> - **"Changes not staged for commit"** (red): only in the **working directory**

### Card 4: Taking something back out of the box
> `git restore --staged notes.txt` takes a file **out of the staging area** but **keeps your edits** in the working directory.
>
> ⚠️ Don't mix it up with plain `git restore notes.txt` from Unit 2, which throws your edits away. The `--staged` makes all the difference.

---

## Questions

### Q1: Multiple choice
**Question:** Charley picked some changes with `git add`. Which area are they in now?

1. Working directory
2. **Staging area** ✓
3. Repository

**Wrong feedback:** Not quite. `git add` puts changes in the staging area, the box for the next snapshot. They reach the repository only after `git commit`.

### Q2: Terminal
**Prompt:** Only the bug fix is ready. Stage just `app.py`.

**Starting history:**
```
$ git status
On branch main
Changes not staged for commit:
        modified:   app.py         ← shown in RED
        modified:   notes.txt      ← shown in RED
$ █
```

**Accepted answers:**
- `git add app.py`

**Fake output:** *(none, matching the real command)*

**Wrong feedback:** Not quite. The answer is `git add app.py`. Naming the file stages only that file.

### Q3: Terminal
**Prompt:** Charley changed their mind: the bug fix needs more work first. Take `app.py` back out of the staging area, without losing the edits.

**Starting history:**
```
$ git status
On branch main
Changes to be committed:
        modified:   app.py         ← shown in GREEN
Changes not staged for commit:
        modified:   notes.txt      ← shown in RED
$ █
```

**Accepted answers:**
- `git restore --staged app.py`
- `git reset app.py` *(older way, same result)*
- `git reset HEAD app.py` *(older way, same result)*

**Fake output:** *(none, matching the real command)*

**Wrong feedback:** Not quite. The answer is `git restore --staged app.py`

### Q4: Multiple choice
**Question:** After `git restore --staged app.py`, what happened to Charley's bug-fix edits?

1. **They're still in the working directory, just not staged** ✓
2. They were deleted for good
3. They were saved in a snapshot

**Wrong feedback:** Not quite. `--staged` only takes the file out of the box. The edits are still in the working directory. (Plain `git restore` without `--staged` is the one that throws edits away.)

---

## Notes

- **This lesson names what players already did.** Unit 1 Lesson 3 taught add/commit as "packing a box"; now the three steps get their real names, and red/green in `git status` gets explained.
- **Q2 → Q3 shows a file moving between areas:** both red → `app.py` green → (after Q3) back to red.
- **`restore` vs `restore --staged`** is a classic beginner mix-up, so Card 4 and Q4 call it out directly, linking back to Unit 2 Lesson 4.
- **Accuracy, `git reset app.py` / `git reset HEAD app.py`:** older commands that unstage a file the same way. Accepted but not taught, matching our decision to leave `git reset` out of the lessons.
- **Accuracy, `git status` output:** real Git also prints hint lines like `(use "git add <file>..." to update what will be committed)`. We leave them out to keep it short, as in Unit 1.
- Correct multiple-choice answers sit in positions 2 and 1.
