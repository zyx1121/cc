# Chapter 2 — Solution: Claude Scope

The finished minimal app from Chapter 2: an Electron desktop window that lists
and views the markdown files Claude Code keeps under
`~/.claude/projects/*/memory/` (on Windows, `%USERPROFILE%\.claude\...`).

## Run it

```
npm install
npm start
```

> The first `npm start` downloads the Electron binary — give it a minute, it's not stuck.

## What's where

- **`src/index.js`** — main process. Opens the window and registers two IPC handlers,
  `scan-memory` and `read-memory`, that read the memory folder with Node's `fs`.
- **`src/preload.js`** — safely exposes `window.scope.scan()` / `window.scope.read()`
  to the page. (`contextIsolation` is on, so the page can't touch `fs` directly —
  everything goes through these two calls.)
- **`src/renderer.js`** — lists the files on the left; shows the clicked file's content on the right.
- **`src/index.html` / `src/index.css`** — the UI.

This is the **"list + view" baseline**. Editing / deleting / creating memory is the
chapter's challenge, and managing Skills on top of this is Chapter 4.
