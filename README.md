# cc

Get a brand-new machine ready for real development — driven by Claude Code itself.

You install Claude Code, then hand it [`SETUP.md`](./SETUP.md). It checks what's already installed, installs the rest (Git, Node.js, Python via uv, GitHub CLI), and walks you through connecting your GitHub account. Works on **macOS** and **Windows**, no terminal experience required — Claude runs the commands, you just follow along.

## 1. Open a terminal

- **macOS** — press ⌘ + Space, type `Terminal`, hit Enter.
- **Windows** — right-click the Start button and choose **Terminal** (or **Windows PowerShell** on Windows 10).

## 2. Install Claude Code

Paste the line for your system and press Enter.

- **macOS**
  ```
  curl -fsSL https://claude.ai/install.sh | bash
  ```
- **Windows — PowerShell** (prompt starts with `PS`)
  ```
  irm https://claude.ai/install.ps1 | iex
  ```
- **Windows — CMD** (prompt starts with `C:\`, no `PS`)
  ```
  curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
  ```

When it prints `Claude Code successfully installed!`, close the terminal and open a fresh one so it picks up the new `claude` command.

## 3. Start Claude Code and log in

```
claude
```

The first run opens your browser to log in. **Claude Code needs a paid plan** — Pro, Max, Team, or Enterprise (the free plan won't work). Authorize in the browser; you're in once you see the input box at the bottom of the terminal.

## 4. Let Claude set up your environment

Hand it `SETUP.md` and let it take over. The simplest way — paste this to Claude Code:

> Read https://raw.githubusercontent.com/zyx1121/cc/main/SETUP.md and follow the steps to get my dev environment ready.

Already cloned this repo? `cd` into it, start `claude`, and type `@SETUP.md` instead.

Claude handles the rest. When it reaches **GitHub login**, that one step is yours to finish in the browser — it'll guide you through it.
