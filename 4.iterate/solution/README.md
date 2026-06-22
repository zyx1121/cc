# Chapter 4 — Solution: Claude Scope v2

The iterated app: Chapter 2's memory viewer, now with a **Memory / Skills** toggle.
Skills mode lists `~/.claude/skills/*/SKILL.md` and shows each skill's content.

## Run it

```
npm install
npm start
```

## What changed from Chapter 2

- **`src/index.js`** — added a `scan-skills` handler that reads `~/.claude/skills/`,
  and the `read-file` handler now allows **both** the memory and skills trees.
- **`src/preload.js`** — exposes `scanSkills` alongside `scanMemory`.
- **`src/renderer.js` + `index.html` + `index.css`** — a Memory/Skills tab that reloads
  the list for the active mode.

The point of the chapter: this was built by **iterating** the Chapter 2 app with the
`electron-tool` skill (Chapter 3) in play — the skill already knew the preload/IPC/safety
pattern, so adding the feature was fast.

> Verified end-to-end on real Windows: both tabs scan their directory and render correctly.
