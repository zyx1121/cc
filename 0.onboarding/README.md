# Chapter 0 — Onboarding

Goal: take a brand-new computer and get to the point where **Claude Code is running and can set up your entire development environment for you.**

You'll do four things:

1. Open a terminal
2. Install Claude Code
3. Start it and log in
4. Hand it `setup.md` to finish setting up your dev tools

No prior terminal experience needed. Just follow the section for your platform — **Windows** or **macOS**.

---

## 1. Open a terminal

### 🪟 Windows

Windows 11 comes with **Windows Terminal**:

- Right-click the **Start** button → click **Terminal**, or
- Press the **Start** key, type `Terminal`, and open it.

> On Windows 10 without Windows Terminal: press Start, type `PowerShell`, and open **Windows PowerShell**. (Or install "Windows Terminal" from the Microsoft Store.)

By default this opens **PowerShell**. You can tell which shell you're in by the prompt:

- `PS C:\Users\You>` → you're in **PowerShell**
- `C:\Users\You>` (no `PS`) → you're in **CMD**

This matters for the next step — the install command is different for each.

### 🍎 macOS

Press **⌘ + Space**, type `Terminal`, and press Enter. That opens **Terminal.app**.

---

## 2. Install Claude Code

Copy the command for your platform, paste it into the terminal, press Enter, and wait for it to finish.

### 🪟 Windows — in **PowerShell**:

```
irm https://claude.ai/install.ps1 | iex
```

If your prompt is **CMD** instead (`C:\` with no `PS`), use this:

```
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

> Seeing `The token '&&' is not a valid statement separator`? You're in PowerShell — use the first command.
> Seeing `'irm' is not recognized`? You're in CMD — use the second command.

### 🍎 macOS:

```
curl -fsSL https://claude.ai/install.sh | bash
```

When it finishes, **close the terminal and open a new one** so it picks up the new `claude` command.

---

## 3. Start Claude Code and log in

In the terminal, run:

```
claude
```

The first time, it opens your browser to log in. **Claude Code needs a paid plan** — Claude Pro, Max, Team, or Enterprise; the free plan doesn't include it. Sign in and approve.

Back in the terminal, when you see Claude Code's input box (a prompt waiting for you to type), you're in. 🎉

> Optional: type `claude doctor` to double-check your install is healthy.

---

## 4. Let Claude Code set up your dev environment

Now hand Claude Code the [`setup.md`](./setup.md) from this chapter. It installs your tools (Git, Node.js, Python/uv, GitHub CLI) and walks you through connecting your GitHub account.

**Simplest way** — paste this to Claude Code:

> Read https://raw.githubusercontent.com/zyx1121/cc/main/0.onboarding/setup.md and set up my development environment by following it.

> Already have this repo on your computer? Instead, `cd` into `0.onboarding`, start `claude` there, type `@setup.md`, and ask it to set up your environment.

Claude Code takes it from there. When it gets to logging in to GitHub, **that part you do yourself in the browser** — it'll guide you step by step.

---

That's Chapter 0. Once your environment is ready, you're set for the rest of the course.
