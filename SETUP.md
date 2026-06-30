# Dev Environment Onboarding

> **This file is written for Claude Code (that's "you") to act on.**
> A student who just installed Claude Code and started it has tagged this file, asking you to get their machine ready for real development.
> The student may be using a terminal for the first time — **you run the commands**, don't paste a wall of commands for them to copy.
> Only stop and walk them through something by hand where *they personally must act* (mainly the GitHub login authorization).
> Reply in whatever language the student talks to you in, and finish with a summary they can actually understand.

---

## Your goal (one sentence)

Take this machine from "Claude Code is installed" to "can clone, write, commit, and push to GitHub," and connect the student's identity to GitHub.

---

## Step 0 — Find out the current state before installing anything

1. **Which OS are you on?** You already know (macOS or Windows). Every step below is split by platform — **only follow the column for this machine; don't carry one OS's commands over to the other** (macOS uses `brew`, Windows uses `winget`; mixing them is guaranteed to fail).
2. **Inventory what's already here.** Run a version check for each tool and note "already present (+ version)" vs "missing." Don't reinstall what's already there.

   ```
   git --version
   node --version
   npm --version
   uv --version
   gh --version
   ```

   A missing tool reports `command not found` (macOS) or `is not recognized` / `不是內部或外部命令` (Windows) — that one is "missing," install it later.

3. **Confirm the package manager is present** (you'll need it below):
   - **macOS** → `brew --version`. If absent, install Homebrew first (see Step 1).
   - **Windows** → `winget --version`. Usually built into Windows 10/11; if truly absent, ask the student to update "App Installer" from the Microsoft Store.

---

## Step 1 — Core tools to install

| Tool | What it's for | macOS | Windows |
|---|---|---|---|
| **Git** | Version control — the foundation for all development | Usually ships with the Xcode tools; if not, `brew install git` | `winget install --id Git.Git -e --accept-package-agreements --accept-source-agreements` |
| **Node.js + npm** | Run JS/TS, install frontend and CLI tools (npm comes with Node) | `brew install node` | `winget install --id OpenJS.NodeJS.LTS -e --accept-package-agreements --accept-source-agreements` |
| **uv** (includes Python) | Python package / venv / interpreter manager | `brew install uv` | `winget install --id astral-sh.uv -e --accept-package-agreements --accept-source-agreements` |
| **GitHub CLI (`gh`)** | Log in to GitHub, create repos / PRs; **the GitHub connection below relies on it** | `brew install gh` | `winget install --id GitHub.cli -e --accept-package-agreements --accept-source-agreements` |

Rule of thumb: **only install what Step 0 marked "missing"; skip what's already present and record its version.**

A few things you must know:

- **You don't install Python separately.** uv manages Python itself. **A working `uv --version` does NOT mean Python is ready** — uv can be installed with zero interpreters behind it. Once uv is present, confirm one: run `uv python list`. If every line ends in `<download available>` (none actually installed), run `uv python install` to add a recent Python. Then `uv run python --version` should print a version. Don't grab Python from the website on top of this — multiple Pythons on one machine fight each other.
- **You don't install ripgrep.** Claude Code ships with it built in, so your search already works.
- **(Optional — don't auto-install these; ask the student or check the course requirements first)** `bun` (a faster JS runtime / package manager), `pnpm`, VS Code, PowerShell 7. When needed:
  - bun → macOS `brew install oven-sh/bun/bun`, Windows `powershell -c "irm bun.sh/install.ps1 | iex"`
  - VS Code → macOS `brew install --cask visual-studio-code`, Windows `winget install --id Microsoft.VisualStudioCode -e`

---

## Step 2 — Platform notes (the trap zones — read these first)

### 🍎 macOS

- **If Homebrew isn't installed, install it first** (everything else depends on it):
  ```
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```
  Afterward it may ask you to add `brew` to your PATH — it prints a couple of `echo ... >> ~/.zprofile` lines at the end. Run those, then open a fresh terminal tab so the change takes effect.
- The first time you use `git`, if a dialog pops up to install the "Xcode Command Line Tools," let it finish (git lives inside that bundle).

### 🪟 Windows (higher complexity than macOS — read carefully)

- **"Command not found" right after installing is *normal*, not a failure.** `winget` / installers update the system PATH, but **your current terminal session won't see it immediately**. If `node --version` still says "not recognized" after an install pass, **don't treat it as a failed install** — ask the student to close the terminal and open a fresh one (or restart Claude Code), then re-verify. This is the most common false failure on Windows.
- **Make sure Git for Windows is installed.** The reason goes beyond version control — **on Windows, you (Claude Code) run Bash commands through the Git Bash that ships with Git for Windows. Without it, you fall back to running commands via PowerShell, and behavior won't match the course material.** So on Windows, `Git.Git` is the top priority; after installing, reopen the terminal and confirm `git --version` works.
- `winget` may ask you to accept source terms on first run — the commands above already pass `--accept-source-agreements --accept-package-agreements`, so it won't stall.
- **No administrator rights are required**, and **do not** use `sudo` (Windows has no such thing).
- Don't paste macOS `brew ...` commands into Windows, or vice versa.

---

## Step 3 — Verify the installs

Once everything's handled (on Windows, after reopening the terminal), run the checks again and confirm each prints a version:

```
git --version
node --version
npm --version
uv --version
uv run python --version
gh --version
```

`uv run python --version` is the real Python check — it confirms an interpreter is actually installed, not just uv (see the uv note in Step 1). If it can't find one, run `uv python install`, then re-check.

All return a version = tools are in place; move on to connecting GitHub. If any still fails, go back and check PATH / reopen the terminal first; only if it's genuinely stuck, explain to the student where it's blocked.

---

## Step 4 — Connect GitHub (full walkthrough — go slow here and do it together)

This step has two separate goals — don't conflate them:
1. **Set the commit identity** — every commit you make is signed, so GitHub knows who wrote it.
2. **Authenticate with GitHub** — give this machine permission to `push` / `clone` private repos.

### 4-1 Set the commit identity (you can run this for them)

Ask the student two things, then configure it:
- The display name they want (an English name or their GitHub username both work)
- Their email (**use the email registered to their GitHub account**; for privacy they can use the GitHub-provided `xxxx+username@users.noreply.github.com`, found under GitHub → Settings → Emails)

```
git config --global user.name "Their Name"
git config --global user.email "their@email.com"
```

Confirm with `git config --global --list` that both `user.name` and `user.email` are present.

### 4-2 Log in to GitHub (`gh auth login` — ⚠️ have the student run this in their own terminal; do NOT run it through your Bash tool)

**Why not run it yourself?** `gh auth login` is an interactive prompt, and the final step needs the student to click "authorize" in their browser *in person* — that's how account security should work and can't be delegated. Your role here is to be **the guide**: give them the command, tell them which option to pick at each prompt, and let them operate their own terminal.

Have the student open a terminal and enter:

```
gh auth login
```

A few multiple-choice prompts follow. **Pick as below** (proactively tell them what to choose at each one, and why):

| Prompt | Choose | Why |
|---|---|---|
| `What account do you want to log into?` | **GitHub.com** | A normal personal account uses this (Enterprise is for company servers) |
| `What is your preferred protocol for Git operations?` | **HTTPS** | Easiest for beginners — no need to generate an SSH key first |
| `Authenticate Git with your GitHub credentials?` | **Yes** | Key step! Saying Yes makes `git push` reuse this login, so they never have to type a password again |
| `How would you like to authenticate GitHub CLI?` | **Login with a web browser** | The browser-authorize flow is the most intuitive |

It then shows a **one-time code** (looks like `XXXX-XXXX`) and prompts them to press **Enter** to open the browser:

1. Have them **note / copy that code**.
2. Press Enter; the browser opens `https://github.com/login/device` (if it doesn't open automatically, have them open that URL manually).
3. Paste the code on that page → Continue → **Authorize** (if they're not already signed in to GitHub, it'll ask them to log in first).
4. Back in the terminal, seeing `✓ Authentication complete` and `✓ Logged in as <their-username>` means success.

> Tip for the student: this code expires after a few minutes — if it lapses, just run `gh auth login` again and redo it.

### 4-3 Verify the connection (you can run this for them)

Once the student reports the login is done, confirm it:

```
gh auth status
```

Seeing `✓ Logged in to github.com account <username>` and `Git operations protocol: https` means it's good.

Do a real check too (optional but recommended):

```
gh repo list
```

If it lists their repos (or shows an empty list with no error) = GitHub is fully connected, and `git clone` / `git push` on private repos won't prompt for auth anymore.

---

## Step 5 — Wrap up with a summary for the student

When everything's done, give a clear summary in the student's language. **Talk like a human, don't paste raw logs.** Include:

1. **What this machine now has** — list the versions of Git / Node.js+npm / uv (Python) / gh.
2. **What you installed this time vs. what was already there** — so they know what changed.
3. **GitHub connection status** — the logged-in account name and the commit identity (name / email).
4. **What they can do next** — e.g., "you can now ask me to `git clone` a repo and start coding," giving them one concrete first move.

Example tone:

> Your environment is ready ✅
> - **Git** 2.x (already had it), **Node.js** 22 LTS + npm (newly installed), **uv** 0.x + Python 3.13 (newly installed), **gh** 2.x (newly installed)
> - **GitHub** logged in as `your-username`; commits will be signed "Your Name <your@email.com>"
> - Next, you can ask me to clone a project, or `git init` a new one in the current folder and start writing. What would you like to do?

---

## Lines you must not cross (guardrails)

- **When unsure, ask the student — don't guess** — especially the email and whether to install optional tools, which are their call.
- **Don't force installs with `sudo`** and don't touch system-level things; install packages at the user level via brew / winget.
- **The GitHub login must be authorized by the student in person in the browser** — never type their username/password for them, never generate and paste a token on their behalf.
- **On Windows, "command not found" means check PATH / reopen the terminal first** — don't rush to declare failure or reinstall a second time.
- **Don't reinstall tools that are already present** — record the version and skip.
