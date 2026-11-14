# Lesson 2: Setting up Git

**Status:** ✅ Written
**Structure:** "Meet your user" card → 3 teaching cards → 2 multiple choice → 2 terminal

---

## Demo user: Jackson Stark

| Field | Value |
|---|---|
| Name | Jackson Stark |
| Email | jackson.stark@example.com |
| Backstory | Just got a new laptop and needs to set up Git |

### "Meet your user" card
> **Meet Jackson Stark**
> Jackson just got a new laptop and needs to set up Git before class tomorrow.
>
> Name: Jackson Stark
> Email: jackson.stark@example.com
>
> You'll be typing commands as Jackson.
>
> **[ Let's go ]**

---

## Machine-dependent setup

Installing Git differs on Windows / Mac / Linux, but the commands after install are identical everywhere.
**Decision:** one teaching card with 3 small tabs (Windows / Mac / Linux) for installing. Everything the user *practices* is the same on every machine. Don't build three versions of the lesson.
The install card is **read-only**: nothing in it is tested.

---

## Teaching cards

### Card 1: Installing Git
> First, Git has to be on your computer. Pick your system:
>
> **[ Windows ]** Download Git from **git-scm.com** and run the installer. The default options are fine. It also installs **Git Bash**, a terminal you can use for Git.
>
> **[ Mac ]** Open **Terminal** and type `git --version`. If Git isn't installed, your Mac will offer to install it for you.
>
> **[ Linux ]** Open a terminal and run `sudo apt install git` (Ubuntu/Debian).
>
> Then check it worked with `git --version`, just like in Lesson 1.

### Card 2: Tell Git who you are
> Every snapshot you save is signed with your name and email, so everyone on a project can see who changed what. It's like a signature, not a login. You only need to set this up once per computer.

### Card 3: The setup commands
> Two commands tell Git who you are:
> - `git config --global user.name "Your Name"`
> - `git config --global user.email "you@example.com"`
>
> `--global` means "use this for every project on this computer." Put your name in quotes because it has a space.
>
> If it worked, Git prints **nothing**. In the terminal, no news is good news.

---

## Questions

### Q1: Multiple choice
**Question:** Why does Git need your name and email?

1. **To sign each snapshot so people know who made the change** ✓
2. To log you in to GitHub
3. To send you notifications

**Wrong feedback:** Not quite. Git signs every snapshot with your name and email. It's a signature, not a login.

### Q2: Multiple choice
**Question:** What does `--global` mean in `git config --global`?

1. Share the setting with everyone on GitHub
2. **Use the setting for every project on this computer** ✓
3. Only use the setting for the current folder

**Wrong feedback:** Not quite. `--global` means the setting applies to every project on this computer.

### Q3: Terminal
**Prompt:** Tell Git to sign Jackson's snapshots with Jackson's name. *(Jackson's info is on the profile card.)*

**Accepted answers:**
- `git config --global user.name "Jackson Stark"`
- `git config --global user.name 'Jackson Stark'`

**Fake output:** *(none, matching the real command; the green feedback bar is the reward)*

**Wrong feedback:** Not quite. The answer is `git config --global user.name "Jackson Stark"`

### Q4: Terminal
**Prompt:** Now set Jackson's email.

**Accepted answers:**
- `git config --global user.email "jackson.stark@example.com"`
- `git config --global user.email 'jackson.stark@example.com'`
- `git config --global user.email jackson.stark@example.com` *(no quotes is valid since an email has no spaces)*

**Fake output:** *(none, matching the real command)*

**Wrong feedback:** Not quite. The answer is `git config --global user.email "jackson.stark@example.com"`

---

## Notes

- **No fake output on purpose.** The real commands print nothing, and Card 3 teaches "no news is good news," a genuine beginner lesson about terminals. The green Correct! bar gives the satisfying moment instead.
- Q1 targets a real beginner misconception: thinking `git config` logs you in to GitHub.
- Name matching is case-sensitive. The exact name is shown on the profile card.
- Correct answers sit in positions 1 and 2, so there's no pattern.
