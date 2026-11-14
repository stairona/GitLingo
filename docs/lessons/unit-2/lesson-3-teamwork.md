# Unit 2, Lesson 3: Teamwork

**Status:** ✅ Written
**Structure:** "Welcome back" card → 4 teaching cards → 4 questions **in workflow order** (terminal → terminal → multiple choice → multiple choice)

---

## Demo user: Jackson Stark (returning from Unit 1, Lesson 2), joining Charley's project

| Field | Value |
|---|---|
| Name | Jackson Stark |
| GitHub username | `jackson-stark-gitlingo` |
| Teammate | Charley Dunkel |
| Repo to join | `https://github.com/charley-dunkel-gitlingo/weather-app.git` **[ 📋 Copy ]** |
| New branch name | `add-forecast` |

### "Welcome back" card
> **Jackson's back, and joining a team!**
> Charley's weather app is getting popular, and Jackson wants to help by adding a 5-day forecast. Charley invited Jackson to the project on GitHub. Time to work together.
>
> Repo: charley-dunkel-gitlingo/weather-app
> New branch: add-forecast
>
> You'll be typing commands as Jackson.
>
> **[ Let's go ]**

---

## Teaching cards

### Card 1: How teams share one project
> A team shares **one repo** on GitHub. Each person works on their **own branch**, and changes reach `main` through pull requests, just like Charley did in the last lesson. Charley added Jackson as a **collaborator** in the repo's settings, so Jackson is allowed to push to it.

### Card 2: Get your own copy with `git clone`
> `git clone <url>` downloads the whole project, with its full history, into a new folder on your laptop. You only clone once. Copy the URL from GitHub, like Lily did in Unit 1.
>
> Then move into the new folder with `cd weather-app`, and make your own branch, just like in Lesson 1.

### Card 3: Review before you merge
> When a teammate opens a pull request, you **review** it on GitHub. Read the changes in the **Files changed** tab, leave comments, then choose **Approve** or **Request changes**. Reviews catch bugs *before* they reach `main`.

### Card 4: Stay up to date
> Your teammates keep merging things into `main`. Before you start something new, switch to `main` and run `git pull`, so you're building on the latest version and not an old one.

---

## Questions

### Q1: Terminal
**Prompt:** Download Charley's project to Jackson's laptop. *(Use the Copy button on the profile card.)*

**Starting history:** *(none, the terminal starts empty)*

**Accepted answers:**
- `git clone https://github.com/charley-dunkel-gitlingo/weather-app.git`
- `git clone https://github.com/charley-dunkel-gitlingo/weather-app`

**Fake output:**
```
Cloning into 'weather-app'...
remote: Enumerating objects: 24, done.
Receiving objects: 100% (24/24), done.
```

**Wrong feedback:** Not quite. The answer is `git clone https://github.com/charley-dunkel-gitlingo/weather-app.git`

### Q2: Terminal
**Prompt:** You're in the project folder. Create a branch called `add-forecast` and switch to it.

**Starting history:**
```
$ cd weather-app
$ git branch
* main                ← shown in GREEN
$ █
```

**Accepted answers:**
- `git switch -c add-forecast`
- `git switch --create add-forecast`
- `git checkout -b add-forecast`

**Fake output:**
```
Switched to a new branch 'add-forecast'
```

**Wrong feedback:** Not quite. The answer is `git switch -c add-forecast`

### Q3: Multiple choice
**Question:** Jackson finished the forecast and opened a pull request. While reviewing it, Charley spots a bug. What should Charley do?

1. **Leave a review and choose "Request changes"** ✓
2. Merge it anyway and fix the bug later
3. Delete Jackson's branch

**Wrong feedback:** Not quite. That's what reviews are for: Charley chooses "Request changes" so Jackson can fix the bug *before* it reaches `main`.

### Q4: Multiple choice
**Question:** Jackson fixed the bug, and Charley merged the pull request. Why should Jackson run `git pull` on `main` before starting something new?

1. To upload Jackson's work to GitHub
2. To delete old branches
3. **To get everything the team merged, so new work starts from the latest version** ✓

**Wrong feedback:** Not quite. `git pull` downloads what teammates merged, so Jackson builds on the newest `main`. Uploading is `git push`.

---

## Notes

- **Repeats on purpose:** Q2 practices `git switch -c` from Lesson 1, and Card 2's Copy button reuses the habit from Unit 1, Lesson 4. Spaced repetition helps beginners remember.
- **`git pull` is tested with multiple choice here** (it was a terminal question in Lesson 2), so this lesson focuses on *why* you pull, not just how.
- **`cd weather-app`** appears in Q2's starting history. Card 2 mentions it, because after cloning you have to move into the new folder; beginners often forget.
- **Accuracy:** `git clone` really prints `Cloning into 'weather-app'...`. The real output has a few more `remote:` progress lines that we leave out.
- **Accuracy, GitHub labels:** "Files changed", "Approve" and "Request changes" are GitHub's current review options (there's also a plain "Comment" option we don't need). On a personal repo, collaborators are added under the repo's **Settings → Collaborators**. Worth a quick check on GitHub before the demo.
- **Fake usernames:** `jackson-stark-gitlingo` is new; it isn't used in any command but is shown on the profile card for consistency.
- Correct multiple-choice answers sit in positions 1 and 3.
