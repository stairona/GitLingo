# Lesson 4: Putting it on GitHub

**Status:** ✅ Written
**Structure:** "Meet your user" card → 4 teaching cards → 2 multiple choice → 2 terminal
**This is the finale of Unit 1.**

---

## Demo user: Lily Lurvey

| Field | Value |
|---|---|
| Name | Lily Lurvey |
| GitHub username | `lily-lurvey-gitlingo` |
| Repo | `portfolio` |
| Branch | `main` |
| Remote URL | `https://github.com/lily-lurvey-gitlingo/portfolio.git` **[ 📋 Copy ]** |

### "Meet your user" card
> **Meet Lily Lurvey**
> Lily built a portfolio website and has been saving snapshots with Git. But right now it only lives on Lily's laptop. Time to put it on GitHub so the world can see it.
>
> GitHub username: lily-lurvey-gitlingo
> Repo: portfolio
>
> You'll be typing commands as Lily.
>
> **[ Let's go ]**

---

## ⭐ Demo feature: the Copy button

The remote URL on Lily's profile card has a **[ 📋 Copy ]** button.

- Click → copies the URL to the clipboard → button changes to **✓ Copied!** for ~2 seconds, then back.
- The user pastes it into the practice terminal (Ctrl+V must work in the terminal box).
- **Why it matters (demo talking point):**
  1. **It teaches a real habit.** On GitHub you copy your repo's URL; you never type it out. GitLingo practices that exact workflow.
  2. **It's fair.** A long URL is easy to typo, and beginners shouldn't lose hearts for a typo instead of a wrong idea. We test *which command*, not typing skill.
- **Demo moment:** in Q3, click Copy, paste into the terminal, add the command around it, Check → Correct.

---

## Teaching cards

### Card 1: Your saves are only on your laptop
> Every snapshot you've made so far lives only on your computer. If your laptop breaks, they're gone, and nobody else can see your work. Uploading to GitHub fixes both: it's a backup *and* a way to share.
>
> `[ 💻 Your laptop: Git ]  ──push──▶  [ ☁️ GitHub ]`

### Card 2: Get your repo's address
> First you create an empty repo on the GitHub website. GitHub then gives you its address, a URL. You don't type it out: you **copy** it. Lily's repo is already created, and the URL is on the profile card with a Copy button.

### Card 3: `git remote add`: connect to GitHub
> `git remote add origin <url>` connects your project to your GitHub repo. `origin` is just a nickname for that GitHub address, so you don't have to type the URL ever again. You only do this once per project.

### Card 4: `git push`: upload your snapshots
> `git push -u origin main` uploads your snapshots to GitHub.
> - `origin`: *where* to send them (your nickname from before)
> - `main`: *which* line of snapshots to send (you'll learn more about this in Unit 2)
> - `-u`: remember this, so next time you can just type `git push`

---

## Questions

### Q1: Multiple choice
**Question:** What does `git push` do?

1. Saves a new snapshot
2. Downloads the project from GitHub
3. **Uploads your snapshots to GitHub** ✓

**Wrong feedback:** Not quite. `git push` uploads your snapshots to GitHub. Saving a snapshot is `git commit`.

### Q2: Multiple choice
**Question:** In `git remote add origin <url>`, what is `origin`?

1. **A nickname for your GitHub repo's address** ✓
2. The name of your first snapshot
3. A folder on your computer

**Wrong feedback:** Not quite. `origin` is a nickname for the GitHub address, so you don't have to type the URL every time.

### Q3: Terminal (⭐ Copy button moment)
**Prompt:** Connect Lily's project to the GitHub repo. *(Use the Copy button on the profile card for the URL.)*

**Starting history:**
```
$ git status
On branch main
nothing to commit, working tree clean
$ █
```

**Accepted answers:**
- `git remote add origin https://github.com/lily-lurvey-gitlingo/portfolio.git`
- `git remote add origin https://github.com/lily-lurvey-gitlingo/portfolio` *(GitHub accepts it without `.git`)*

**Fake output:** *(none, matching the real command)*

**Wrong feedback:** Not quite. The answer is `git remote add origin https://github.com/lily-lurvey-gitlingo/portfolio.git`

### Q4: Terminal (the finale)
**Prompt:** Everything's connected. Upload Lily's snapshots to GitHub.

**Starting history** (shows the connection from Q3 worked):
```
$ git remote -v
origin  https://github.com/lily-lurvey-gitlingo/portfolio.git (fetch)
origin  https://github.com/lily-lurvey-gitlingo/portfolio.git (push)
$ █
```

**Accepted answers:**
- `git push -u origin main`
- `git push --set-upstream origin main`

**Fake output:**
```
Enumerating objects: 12, done.
Writing objects: 100% (12/12), done.
To https://github.com/lily-lurvey-gitlingo/portfolio.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

**Wrong feedback:** Not quite. The answer is `git push -u origin main`

---

## Notes

- Q1's wrong feedback separates `push` from `commit`, the most common beginner mix-up at this stage.
- Card 4 mentions branches only briefly and points to Unit 2. That's a nice teaser for judges ("there's more coming").
- `git status` in Q3's starting history shows "nothing to commit," which connects back to Lesson 3: everything is already saved, it just isn't uploaded yet.
- Correct answers sit in positions 3 and 1, so there's no pattern.
- **Optional idea (not decided):** finishing Lesson 4 could show a special **"Unit 1 complete"** screen instead of the normal lesson-complete screen, as the big ending of the demo. Use our own style; don't imitate GitHub's look.
