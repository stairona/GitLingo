# Unit 2, Lesson 2: Merging on GitHub

**Status:** ✅ Written
**Structure:** "Welcome back" card → 4 teaching cards → 4 questions **in workflow order** (terminal → multiple choice → multiple choice → terminal)

**Decision:** we teach merging the way most teams actually do it: **on GitHub, with a pull request**, not with `git merge` in the terminal. The terminal is only used for the two steps that really happen on your laptop: pushing the branch up, and pulling the merged `main` back down.

---

## Demo user: Charley Dunkel (continuing from Unit 2, Lesson 1)

| Field | Value |
|---|---|
| Name | Charley Dunkel |
| GitHub username | `charley-dunkel-gitlingo` |
| Repo | `weather-app` |
| Current branch | `add-dark-mode` |
| Merge into | `main` |

### "Welcome back" card
> **Dark mode is done!**
> Charley finished dark mode on the `add-dark-mode` branch and tested it. It works. Now it's time to merge it into `main`, the real version of the app, using GitHub.
>
> Repo: weather-app
> Branch to merge: add-dark-mode → main
>
> You'll be typing commands as Charley.
>
> **[ Let's go ]**

---

## Teaching cards

### Card 1: Merging happens on GitHub
> Merging brings the snapshots from one branch into another, like copying the progress from your experimental save slot into your main save. Most teams don't merge in the terminal. They merge on GitHub with a **pull request**: a page that says "here are my changes, please merge them," so teammates can look first.

### Card 2: Step 1: upload your branch
> GitHub can only merge what it can see, so first push your branch:
> `git push -u origin add-dark-mode`
>
> It's the same push from Unit 1, just with your branch's name instead of `main`. GitHub will then offer a **Compare & pull request** button.

### Card 3: Step 2: set base and compare
> When you open a pull request, GitHub asks for two branches:
> - **base**: the branch you're merging **into** (usually `main`)
> - **compare**: the branch **with your changes**
>
> `base: main  ←  compare: add-dark-mode`
>
> The arrow shows the direction: changes flow from compare into base.

### Card 4: Step 3: merge, then bring it home
> Click **Merge pull request**, then **Confirm merge**. Now `main` on GitHub has dark mode, but your laptop doesn't yet. Switch to `main` and run `git pull` to download it.
>
> (If both branches changed the same lines, GitHub warns you about a **conflict** before you can merge.)

---

## Questions

### Q1: Terminal
**Prompt:** Upload Charley's `add-dark-mode` branch to GitHub.

**Starting history:**
```
$ git branch
* add-dark-mode       ← shown in GREEN
  main
$ █
```

**Accepted answers:**
- `git push -u origin add-dark-mode`
- `git push --set-upstream origin add-dark-mode`
- `git push origin add-dark-mode`

**Fake output:**
```
Enumerating objects: 5, done.
Writing objects: 100% (3/3), done.
remote:
remote: Create a pull request for 'add-dark-mode' on GitHub by visiting:
remote:      https://github.com/charley-dunkel-gitlingo/weather-app/pull/new/add-dark-mode
remote:
To https://github.com/charley-dunkel-gitlingo/weather-app.git
 * [new branch]      add-dark-mode -> add-dark-mode
branch 'add-dark-mode' set up to track 'origin/add-dark-mode'.
```

**Wrong feedback:** Not quite. The answer is `git push -u origin add-dark-mode`

### Q2: Multiple choice (base and compare)
**Question:** Charley opens a pull request on GitHub. Which setup merges dark mode **into** `main`?

1. `base: add-dark-mode  ←  compare: main`
2. **`base: main  ←  compare: add-dark-mode`** ✓
3. `base: main  ←  compare: main`

**Wrong feedback:** Not quite. **Base** is where the changes go (`main`). **Compare** is the branch with the changes (`add-dark-mode`).

### Q3: Multiple choice
**Question:** Charley clicked **Merge pull request** on GitHub. Does Charley's laptop have the new `main` yet?

1. Yes, it updates automatically
2. No, Charley has to merge again in the terminal
3. **No, Charley needs to download it with `git pull`** ✓

**Wrong feedback:** Not quite. The merge happened on GitHub. Charley's laptop only gets it after a `git pull`.

### Q4: Terminal
**Prompt:** The merge is done on GitHub. Download the updated `main` to Charley's laptop.

**Starting history:**
```
$ git switch main
Switched to branch 'main'
$ █
```

**Accepted answers:**
- `git pull`
- `git pull origin main`

**Fake output:**
```
From https://github.com/charley-dunkel-gitlingo/weather-app
   a1b2c3d..9f8e7d6  main       -> origin/main
Updating a1b2c3d..9f8e7d6
Fast-forward
 app.py | 12 ++++++++++++
 1 file changed, 12 insertions(+)
```

**Wrong feedback:** Not quite. The answer is `git pull`

---

## Notes

- **Question order follows the real workflow** (push → set up PR → merge → pull) instead of the usual "multiple choice first, then terminal." The lesson engine should just show questions in the order they're listed in the data.
- **Q2's answer options are styled like code** so they look like the base/compare bar. *Optional upgrade if there's time:* a small mock "base ← compare" bar with two dropdowns, in **our own style** (not a copy of GitHub's page).
- **New demo-user field:** Charley's GitHub username, `charley-dunkel-gitlingo` (invented, like Lily's), needed for the URLs in the output.
- **Accuracy, Q1 output:** when you push a new branch, GitHub really does print the "Create a pull request ... by visiting" message. It connects nicely to Card 2.
- **Accuracy, Q4 output:** `main` on Charley's laptop hasn't changed since the merge, so the pull is a "Fast-forward" to the merged version on GitHub. The real output also has a few `remote: ...` progress lines that we leave out.
- **Accuracy, GitHub buttons:** "Compare & pull request", "Merge pull request" and "Confirm merge" are GitHub's current labels. Worth a quick check on GitHub before the demo in case they change.
- Merge conflicts get one sentence in Card 4 and aren't tested.
- Correct multiple-choice answers sit in positions 2 and 3.
