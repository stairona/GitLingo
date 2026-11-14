# Unit 2, Lesson 4: Undoing mistakes

**Status:** ✅ Written
**Structure:** "Welcome back" card → 4 teaching cards → 4 questions **in workflow order** (multiple choice → terminal → multiple choice → terminal)
**This is the finale of Unit 2.**

---

## Demo user: Lily Lurvey (returning from Unit 1, Lesson 4)

| Field | Value |
|---|---|
| Name | Lily Lurvey |
| GitHub username | `lily-lurvey-gitlingo` |
| Repo | `portfolio` |
| File | `index.html` |
| Broken commit | "Add contact form" |

### "Welcome back" card
> **Lily's back, and something broke!**
> Lily's portfolio has been live on GitHub since Unit 1. But today two things went wrong: an edit Lily hasn't saved yet broke the home page, and a commit Lily already pushed broke the contact form. Time to undo both.
>
> Repo: portfolio
> File: index.html
>
> You'll be typing commands as Lily.
>
> **[ Let's go ]**

---

## Teaching cards

### Card 1: Everyone makes mistakes
> Undoing mistakes is one of the best things about Git. Which tool you use depends on one question: **have you committed yet?**
> - **Not committed yet** → `git restore`
> - **Already committed** → `git revert`

### Card 2: `git restore`: throw away changes you haven't committed
> `git restore index.html` puts the file back the way it was in your last snapshot.
>
> ⚠️ Careful: those changes are gone for good, because Git never saved them. If it worked, Git prints nothing.

### Card 3: Find the commit with `git log`
> `git log --oneline` lists your snapshots, newest first, one per line. **HEAD** means the snapshot you're on right now, which is usually the newest one.

### Card 4: `git revert`: undo a commit safely
> `git revert HEAD` makes a **new** snapshot that undoes the newest one. The broken commit stays in the history, but its changes are reversed. That's safe even after you've pushed, because your teammates' history doesn't get rewritten. Then `git push` to share the fix.
>
> (In a real terminal, Git opens a text editor for the message. Just save and close it, or add `--no-edit` to skip it.)

---

## Questions

### Q1: Multiple choice
**Question:** Lily changed `index.html` and broke the home page, but hasn't committed yet. What will `git restore index.html` do?

1. Delete `index.html`
2. Undo Lily's last commit
3. **Throw away the uncommitted changes and go back to the last snapshot** ✓

**Wrong feedback:** Not quite. `git restore` throws away changes you haven't committed. The file goes back to the last snapshot.

### Q2: Terminal
**Prompt:** Throw away Lily's broken changes to `index.html`.

**Starting history:**
```
$ git status
Changes not staged for commit:
        modified:   index.html      ← shown in RED
$ █
```

**Accepted answers:**
- `git restore index.html`
- `git checkout -- index.html` *(the older way, same result)*

**Fake output:** *(none, matching the real command)*

**Wrong feedback:** Not quite. The answer is `git restore index.html`

### Q3: Multiple choice
**Question:** The broken "Add contact form" commit is already on GitHub. Why should Lily use `git revert`?

1. It deletes the commit so nobody ever sees it
2. **It adds a new snapshot that undoes the change, without rewriting history** ✓
3. It brings back changes Lily never committed

**Wrong feedback:** Not quite. `git revert` doesn't delete anything. It adds a new snapshot that reverses the bad one, which is safe for commits already on GitHub.

### Q4: Terminal (the finale)
**Prompt:** Undo the newest commit, "Add contact form".

**Starting history:**
```
$ git log --oneline
e4f5a6b (HEAD -> main, origin/main) Add contact form
9c8d7e6 Add project page
a1b2c3d First version of portfolio
$ █
```

**Accepted answers:**
- `git revert HEAD`
- `git revert HEAD --no-edit`
- `git revert --no-edit HEAD`
- `git revert e4f5a6b`

**Fake output:**
```
[main 7d3e2f1] Revert "Add contact form"
 1 file changed, 40 deletions(-)
```

**Wrong feedback:** Not quite. The answer is `git revert HEAD`

---

## Notes

- **Restore vs revert is the key idea.** Card 1 frames it as one question ("have you committed yet?") so beginners stop mixing them up. Q1 and Q3 each test one side.
- **Accuracy, the text editor:** real `git revert` opens an editor for the commit message. The fake terminal skips that step; Card 4 says so honestly and mentions `--no-edit`.
- **Accuracy, `git revert e4f5a6b`:** reverting by the commit's ID does the same thing here, so it's accepted.
- **Accuracy, Q4 starting history:** `(HEAD -> main, origin/main)` is how real `git log --oneline` labels the newest commit when it has been pushed. Card 3 explains HEAD; `origin/main` just means "GitHub has this too."
- **Not taught on purpose:** `git reset`. It rewrites history, which can cause trouble on shared branches. Could be a Unit 3 topic.
- **Accuracy, `git checkout -- index.html`:** the older way to discard changes to a file, still valid. Accepted so learners who've seen it aren't punished.
- Correct multiple-choice answers sit in positions 3 and 2.
- **Optional idea:** a "Unit 2 complete" screen, like the optional one for Unit 1.
