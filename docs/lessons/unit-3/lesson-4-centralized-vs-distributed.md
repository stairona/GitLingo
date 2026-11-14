# Unit 3, Lesson 4: Centralized vs. distributed

**Status:** ✅ Written
**Structure:** "Welcome back" card → 4 teaching cards → **3 multiple choice + 1 terminal**, in story order (multiple choice → terminal → multiple choice → multiple choice)
**This is the finale of Unit 3, and of the whole course.**

---

## Demo users: all three (you type as Jackson)

| Field | Value |
|---|---|
| You are | Jackson Stark |
| With | Charley Dunkel, Lily Lurvey |
| Project | `weather-app` |
| Branch | `add-forecast` |
| Commit message | Add rain alerts |

### "Welcome back" card
> **The whole crew is back!**
> Jackson, Charley and Lily are having a late study session at the library, when the Wi-Fi goes down. Lily panics: "Can we still work without GitHub?" Time to find out why Git says yes.
>
> Project: weather-app
> Commit message: Add rain alerts
>
> You'll be typing commands as Jackson.
>
> **[ Let's go ]**

---

## Teaching cards

### Card 1: Two ways to share a project
> **Centralized:** one central server holds the history. Everyone's laptop only has the latest files. Older tools like Subversion (SVN) work this way.
> **Distributed:** every copy has the **full history**. Git works this way.
>
> ```
> Centralized:   [💻]   [💻]   [💻]
>                   \     |     /
>               [ 🖥️ Server: the only history ]
>
> Distributed:   [💻 full history] ⇄ [☁️ GitHub: full history] ⇄ [💻 full history]
> ```

### Card 2: You already have everything
> When you clone a project, you get **every snapshot ever made**, not just the latest files. That's why `git log`, `git commit`, `git branch` and `git switch` all work with no internet.

### Card 3: Only some commands need internet
> The commands that talk to GitHub need internet: `git clone`, `git push` and `git pull`. Everything else works anywhere, even on a plane.

### Card 4: No single point of failure
> In a centralized system, if the server breaks, the history can be lost. With Git, **every clone is a full backup**. GitHub is just the copy your team agreed to share. That's what "distributed" means.

---

## Questions

### Q1: Multiple choice
**Question:** What's the big difference between centralized and distributed version control?

1. **In distributed (like Git), every copy has the full history** ✓
2. Distributed only works with internet
3. Centralized lets everyone work offline

**Wrong feedback:** Not quite. In a distributed system like Git, every copy has the full history. In a centralized one, only the server does.

### Q2: Terminal (the "it still works!" moment)
**Prompt:** No Wi-Fi, so the push failed. But Jackson can still save new work. Commit the staged changes with the message on the profile card.

**Starting history:**
```
$ git push
fatal: unable to access 'https://github.com/charley-dunkel-gitlingo/weather-app.git/': Could not resolve host: github.com      ← shown in RED
$ git add .
$ █
```

**Accepted answers:**
- `git commit -m "Add rain alerts"`
- `git commit -m 'Add rain alerts'`

**Fake output:**
```
[add-forecast 5e6f7a8] Add rain alerts
 1 file changed, 8 insertions(+)
```

**Wrong feedback:** Not quite. The answer is `git commit -m "Add rain alerts"`. Committing works offline, because the whole database is on Jackson's laptop.

### Q3: Multiple choice
**Question:** The Wi-Fi is still down. Which of these commands **won't** work?

1. `git commit`
2. `git log`
3. **`git push`** ✓

**Wrong feedback:** Not quite. `git push` talks to GitHub, so it needs internet. `git commit` and `git log` only use your own copy.

### Q4: Multiple choice (the finale)
**Question:** Imagine GitHub's copy of the weather app was lost. Could the team get their project back?

1. No, GitHub had the only history
2. **Yes, any teammate's clone has the full history** ✓
3. Only the latest files, not the history

**Wrong feedback:** Not quite. Every clone is a full copy of the history, so any teammate could put it all back.

---

## Notes

- **Q2 shows the whole lesson in one screen:** the red push error (needs internet) sits right above a commit that works fine (doesn't need internet).
- **Accuracy, the push error:** `fatal: unable to access '<url>/': Could not resolve host: github.com` is what real Git prints when there's no internet connection.
- **Accuracy, Subversion (SVN):** a real, well-known centralized version control system. Some centralized setups do keep backups, so Card 4 says the history *can* be lost, not *will* be.
- **Accuracy, "every clone has the full history":** true for a normal `git clone`. (Special "shallow" clones can skip history; that's too advanced to mention.)
- **The Wi-Fi outage is at the library, not GitHub,** so we don't make claims about a real company's service going down.
- **3 multiple choice + 1 terminal** on purpose, as decided: this lesson is mostly an idea.
- Correct multiple-choice answers sit in positions 1, 3 and 2.
- **Optional idea:** since this ends the course, finishing it could show a **"Course complete"** screen, a nice final moment for the demo.
