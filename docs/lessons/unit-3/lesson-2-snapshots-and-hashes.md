# Unit 3, Lesson 2: Snapshots & hashes

**Status:** ✅ Written
**Structure:** "Welcome back" card → 4 teaching cards → 4 questions **in workflow order** (multiple choice → terminal → terminal → multiple choice)

---

## Demo user: Jackson Stark (returning)

| Field | Value |
|---|---|
| Name | Jackson Stark |
| Email | jackson.stark@example.com |
| Project | `weather-app` (Charley's repo) |
| Branch | `add-forecast` |
| Commit to find | "Add 5-day forecast" |

### "Welcome back" card
> **Jackson's back, and Charley has a question.**
> Charley messaged: "Which commit added the forecast? Send me its ID so I can take a look." Every commit has an ID, but what *is* it, and where does it come from?
>
> Project: weather-app
> Branch: add-forecast
>
> You'll be typing commands as Jackson.
>
> **[ Let's go ]**

---

## Teaching cards

### Card 1: Snapshots, not lists of changes
> Each commit is a **snapshot**: a picture of your *whole* project at that moment, not just a list of what changed. Files that didn't change aren't copied again. Git just points to the copy it already has. That's how Git stays fast and small.

### Card 2: Every snapshot has an ID called a hash
> Every commit gets an ID called a **hash**: 40 letters and numbers, like `4c5d6e7f8a9b0c1d2e3f...`. Git calculates it from **everything** in the commit: the files, the author, the time, the message, and the hash of the commit before it. Think of it as the commit's fingerprint.

### Card 3: Why fingerprints matter
> Change even one letter in a commit, and its hash changes completely. And because every commit includes the hash of the one before it, changing an old commit would change **every hash after it** too. So Git can always tell if history was changed.

### Card 4: Using hashes
> You usually only need the first 7 characters, like `4c5d6e7`. That's the short ID you saw with `git log --oneline` in Unit 2.
> - `git log` shows your commits with their **full** hashes
> - `git show 4c5d6e7` opens one snapshot and shows what changed in it

---

## Questions

### Q1: Multiple choice
**Question:** What is a commit hash?

1. The commit's message
2. A password that protects the commit
3. **A unique ID calculated from everything in the commit** ✓

**Wrong feedback:** Not quite. A hash is a commit's fingerprint: an ID Git calculates from the files, author, time, message and the commit before it.

### Q2: Terminal
**Prompt:** Show Jackson's commit history, with the full hashes.

**Starting history:** *(none, the terminal starts empty)*

**Accepted answers:**
- `git log`

**Fake output:**
```
commit 4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d (HEAD -> add-forecast)
Author: Jackson Stark <jackson.stark@example.com>
Date:   Sat Nov 14 21:15:42 2026 -0500

    Add 5-day forecast

commit 7b6a5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b
Author: Charley Dunkel <charley.dunkel@example.com>
Date:   Sat Nov 14 19:02:10 2026 -0500

    Add dark mode
```

**Wrong feedback:** Not quite. The answer is `git log`

### Q3: Terminal
**Prompt:** Open the "Add 5-day forecast" snapshot using its short hash, `4c5d6e7`.

**Starting history:** *(the `git log` output from Q2 stays on screen, so the hash is visible)*

**Accepted answers:**
- `git show 4c5d6e7`
- `git show 4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d`
- `git show HEAD` *(same commit, since it's the newest)*

**Fake output:**
```
commit 4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d (HEAD -> add-forecast)
Author: Jackson Stark <jackson.stark@example.com>
Date:   Sat Nov 14 21:15:42 2026 -0500

    Add 5-day forecast

diff --git a/forecast.py b/forecast.py
new file mode 100644
--- /dev/null
+++ b/forecast.py
@@ -0,0 +1,3 @@
+def five_day_forecast(city):      ← shown in GREEN
+    # Get the weather for the next 5 days      ← GREEN
+    ...      ← GREEN
```

**Wrong feedback:** Not quite. The answer is `git show 4c5d6e7`

### Q4: Multiple choice
**Question:** Someone secretly edits an old commit in Jackson's history. What happens to the hashes?

1. Nothing changes
2. **That commit's hash changes, and so does every hash after it** ✓
3. Only the newest commit's hash changes

**Wrong feedback:** Not quite. Each commit includes the hash of the one before it, so changing an old commit changes its hash *and* every hash after it.

---

## Notes

- **Q3 needs Q2's output to stay visible** (so the player can see the hash). Simplest way: Q3's starting history is a copy of Q2's output.
- **Accuracy, hash length and type:** Git's commit hashes are 40 characters (SHA-1 by default; newer Git can also use SHA-256, which is longer). We say "40 letters and numbers" and don't name the algorithm, to keep it simple. Short hashes are *usually* 7 characters; Git uses more in very big projects.
- **Accuracy, "snapshots":** conceptually every commit is a full snapshot, and unchanged files are reused, not copied. Internally Git also compresses files when packing them, but that's below the level this lesson needs.
- **Accuracy, `git show` output:** the real diff has an extra `index 0000000..3b18e51` line, which we leave out. Added lines really are shown in green.
- **Accuracy, dates:** November 14, 2026 is a Saturday, so the `Date:` lines are realistic.
- **New fake email:** `charley.dunkel@example.com` (Charley's email hadn't been needed before).
- Real `git log` may open a scrolling viewer when the history is long; with only two commits it just prints. Not mentioned to players.
- Correct multiple-choice answers sit in positions 3 and 2.
