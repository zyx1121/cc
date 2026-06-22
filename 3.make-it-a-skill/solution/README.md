# Chapter 3 — Solution: the `electron-tool` Skill

The Skill from Chapter 3. It freezes the "build a local-file Electron tool" know-how
from Chapter 2 so Claude reuses it **automatically** next time — no re-explaining.

## Install it

Copy the `electron-tool/` folder into your personal skills directory:

- macOS / Linux: `~/.claude/skills/electron-tool/`
- Windows: `%USERPROFILE%\.claude\skills\electron-tool\`

(Or just ask Claude to create it for you — that's what the chapter walks you through.)

## How it works

- The frontmatter **`description` is the trigger**: Claude reads it and decides, on its
  own, when the skill is relevant. (Keep `description` + any `when_to_use` under ~1,536
  characters — that's the budget Claude keeps loaded.)
- The **body is the SOP**: Plan → scaffold (vanilla `create-electron-app`) → file I/O in
  the main process via IPC → preload bridge → UI → path safety → run/fix loop.

## Verify it triggers

In a **fresh** conversation, with a natural prompt (no `/electron-tool`):

> I want to build a small Electron desktop tool that lists files in a folder.

Claude should answer with this skill's specifics — vanilla template, file I/O in main via
IPC, the preload bridge, "the first `npm start` downloads the binary", path safety — none
of which you mentioned. Use `/skills` to see it listed and toggle it off to compare.

> Verified end-to-end with `claude -p` on real Windows: a natural prompt (no slash command)
> made Claude reproduce this skill's SOP, confirming automatic invocation.
