# Unit 3, Lesson 3: Git as a database

**Status:** ✅ Written
**Structure:** "Welcome back" card → 4 teaching cards → 4 questions **in workflow order** (terminal → multiple choice → terminal → multiple choice)

**Decision:** no `git cat-file` (too low-level for beginners). The lesson explains the database as a concept and only uses commands players can follow: `ls -a` and `git log --oneline`.

---

## Demo user: Lily Lurvey (returning)

| Field | Value |
|---|---|
| Name | Lily Lurvey |
| Project folder | `portfolio` |
| Files | `index.html`, `about.html`, `style.css` |

### "Welcome back" card
> **Lily's back, and curious.**
> Lily has been saving snapshots for a while now, and even undid a broken commit. But where does Git actually *keep* all of that? Time to find Git's hidden database.
>
> Project folder: portfolio
>
> You'll be typing commands as Lily.
>
> **[ Let's go ]**

---

## Teaching cards

### Card 1: Git is a database
> A database is a place that stores information so you can look it up later. Git's database stores **every snapshot** of your project. It lives in a hidden folder called `.git` inside your project, created when you ran `git init`.
>
> `ls -a` lists *all* files, including hidden ones (names starting with a dot). On Windows, use **Git Bash** for this.

### Card 2: What's inside
> Git stores three kinds of things:
> - **File contents**: what's inside each file
> - **Folder lists**: which files are in each folder
> - **Commits**: who, when, the message, and which snapshot came before
>
> *(If you're curious, their official names are blobs, trees and commits.)*

### Card 3: Everything is filed under its hash
> Every item is stored under its **hash**, like a label on a drawer. Two files with exactly the same contents get the same hash, so Git stores them **only once**. That's why unchanged files aren't copied in every snapshot.

### Card 4: Don't touch `.git`
> Never edit or delete the `.git` folder yourself. If it's deleted, your current files stay, but **every snapshot is gone**: your whole history. (Unless it's also on GitHub. Another reason to push!)

---

## Questions

### Q1: Terminal
**Prompt:** List *all* the files in Lily's project, including hidden ones.

**Starting history:**
```
$ ls
about.html  index.html  style.css
$ █
```

**Accepted answers:**
- `ls -a`
- `ls -la`
- `ls -al`

**Fake output:**
```
.  ..  .git  about.html  index.html  style.css
```

**Wrong feedback:** Not quite. The answer is `ls -a`. The `-a` means "all," including hidden files.

### Q2: Multiple choice
**Question:** Lily deletes the `.git` folder by accident (and never pushed). What's lost?

1. Nothing, Git rebuilds it
2. **Every snapshot, the whole history. The current files stay.** ✓
3. The current files, but the history stays

**Wrong feedback:** Not quite. `.git` *is* the database. Delete it and every snapshot is gone, though the current files stay.

### Q3: Terminal
**Prompt:** Ask Git's database for all of Lily's snapshots, one per line.

**Accepted answers:**
- `git log --oneline`

**Fake output:**
```
7d3e2f1 (HEAD -> main, origin/main) Revert "Add contact form"
e4f5a6b Add contact form
9c8d7e6 Add project page
a1b2c3d First version of portfolio
```

**Wrong feedback:** Not quite. The answer is `git log --oneline`

### Q4: Multiple choice
**Question:** Lily has two files with exactly the same contents. How many copies of those contents does Git store?

1. Two, one for each file
2. None, Git only stores changes
3. **One, because same contents means the same hash** ✓

**Wrong feedback:** Not quite. Git files everything under its hash. Same contents, same hash, so it's stored only once.

---

## Notes

- **Q1 shows the "whoa" moment without `cat-file`:** plain `ls` shows 3 files, `ls -a` reveals `.git`, the database that was there all along.
- **`ls -a` isn't a Git command.** It's a basic terminal command; Card 1 explains it. On Windows it works in **Git Bash** (PowerShell would use `ls -Force` instead; we don't teach that).
- **Q3's output continues the story** from Unit 2 Lesson 4: the revert Lily made (`7d3e2f1`) is the newest commit, and the hashes match that lesson.
- **Accuracy, deleting `.git`:** correct: the working files stay, the history is gone, unless a copy exists on GitHub (or another clone).
- **Accuracy, storing once:** Git stores identical file contents once, because they get the same hash. This is a real, core part of how Git works.
- **Accuracy, "three kinds of things":** blobs, trees and commits are Git's three main object types (there's also a fourth, tags, which we leave out).
- Correct multiple-choice answers sit in positions 2 and 3.
