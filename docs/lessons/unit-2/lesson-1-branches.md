# Unit 2, Lesson 1: Branches

**Status:** ✅ Written
**Structure:** "Welcome back" card → 3 teaching cards → 2 multiple choice → 2 terminal

---

## Demo user: Charley Dunkel (returning from Unit 1, Lesson 3)

| Field | Value |
|---|---|
| Name | Charley Dunkel |
| Project folder | `weather-app` |
| Current branch | `main` |
| New branch name | `add-dark-mode` |

### "Welcome back" card
Same layout as "Meet your user", but for a returning character.
> **Charley's back!**
> Charley's weather app works now, and it's saved on GitHub. Next up: a dark mode. But Charley doesn't want to risk breaking the version that already works.
>
> Project folder: weather-app
> New branch: add-dark-mode
>
> You'll be typing commands as Charley.
>
> **[ Let's go ]**

---

## Teaching cards

### Card 1: What is a branch?
> A branch is a separate line of snapshots. Think of it as a second save slot in a game: you can try something risky there, and your main save stays safe. Every project starts with one branch, called `main`.
>
> ```
> main:            ●──●──●
>                         \
> add-dark-mode:           ●──●
> ```

### Card 2: Make a branch and move onto it
> `git switch -c add-dark-mode` creates a new branch called `add-dark-mode` and moves you onto it. The `-c` means "create." From now on, new snapshots go on this branch, and `main` isn't touched.
>
> Older tutorials use `git checkout -b add-dark-mode`, which does the same thing.

### Card 3: See your branches
> `git branch` lists all your branches. The one with a `*` next to it is the branch you're on right now.

---

## Questions

### Q1: Multiple choice
**Question:** Why would Charley make a branch for dark mode?

1. To delete old snapshots
2. To upload the project to GitHub
3. **To try changes without affecting `main`** ✓

**Wrong feedback:** Not quite. A branch is like a second save slot: Charley can experiment there while `main` stays safe.

### Q2: Multiple choice
**Question:** When you run `git branch`, what does the `*` mean?

1. **That's the branch you're on right now** ✓
2. That's the newest branch
3. That branch has an error

**Wrong feedback:** Not quite. The `*` marks the branch you're currently on.

### Q3: Terminal
**Prompt:** Create a branch called `add-dark-mode` and switch to it.

**Starting history:**
```
$ git branch
* main                ← shown in GREEN
$ █
```

**Accepted answers:**
- `git switch -c add-dark-mode`
- `git switch --create add-dark-mode`
- `git checkout -b add-dark-mode`

**Fake output:**
```
Switched to a new branch 'add-dark-mode'
```

**Wrong feedback:** Not quite. The answer is `git switch -c add-dark-mode`

### Q4: Terminal
**Prompt:** List all of Charley's branches to check where you are.

**Accepted answers:**
- `git branch`
- `git branch --list`

**Fake output:**
```
* add-dark-mode       ← shown in GREEN
  main
```

**Wrong feedback:** Not quite. The answer is `git branch`

---

## Notes

- **We teach `git switch -c` first** because it's the newer, clearer command (added in Git 2.23, 2019). `git checkout -b` is still accepted because many tutorials use it, and Card 2 mentions it so learners aren't confused later.
- **Accuracy:** both `git switch -c` and `git checkout -b` really print `Switched to a new branch '<name>'`. Real `git branch` colors the current branch green and marks it with `*`.
- Q4's output shows the `*` moving from `main` to `add-dark-mode`, the same "see it change" idea as red → green in Unit 1, Lesson 3.
- **New for Unit 2:** the "Welcome back" card, a small variation of "Meet your user" for returning characters.
- Correct answers sit in positions 3 and 1, so there's no pattern.
