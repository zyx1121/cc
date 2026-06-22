---
name: electron-tool
description: Build a small cross-platform desktop app with Electron that reads or writes local files. Use when the user wants a desktop GUI tool / 桌面小工具 / Electron app that views or edits files on their computer (notes, logs, memory, config, etc.).
---

# Build a local-file Electron desktop tool

Follow this whenever the user wants a small Electron desktop app that reads or writes files on their own machine.

## Steps

1. **Plan first.** Pin down: which folder/paths it reads, what the UI shows, and what actions it needs (view / edit / delete). Don't scaffold until that's clear.

2. **Scaffold** with the official generator — vanilla template, no bundler, simplest for beginners:
   ```
   npx --yes create-electron-app@latest <app-name>
   ```
   The first `npm start` downloads the Electron binary; that wait is expected, not a hang.

3. **Do file I/O in the main process, never the renderer.** `contextIsolation` is on by default, so the page can't use Node's `fs`. Read/write in `src/index.js` (main) with `fs` + `os.homedir()`, exposed over IPC:
   ```js
   ipcMain.handle('list-files', () => /* read dir with fs */);
   ipcMain.handle('read-file', (_e, p) => /* fs.readFileSync, after a path-safety check */);
   ```

4. **Bridge with a preload script** using `contextBridge` — expose only the few functions the UI needs, not raw `fs`:
   ```js
   contextBridge.exposeInMainWorld('api', {
     list: () => ipcRenderer.invoke('list-files'),
     read: (p) => ipcRenderer.invoke('read-file', p),
   });
   ```

5. **Build the UI** in `index.html` + a `renderer.js` that calls `window.api.*`. Keep `index.css` simple and modern (dark, rounded, readable).

6. **Path safety:** in any read/write handler, verify the path stays inside the intended folder before touching it.

7. **Run & iterate:** `npm start`; when an error shows up, read it, fix it, run again. That loop is normal.

## Notes
- Ship the smallest thing that works first (list + view), then add edit/delete.
- `os.homedir()` is `C:\Users\<name>` on Windows, `/Users/<name>` on macOS — use `path.join` and it's cross-platform.
