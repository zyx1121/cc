const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// Claude Code keeps its memory here: ~/.claude/projects/<project>/memory/
const projectsDir = path.join(os.homedir(), '.claude', 'projects');

// Scan every memory/ folder under projects/ and collect the .md files.
function scanMemory() {
  const result = [];
  if (!fs.existsSync(projectsDir)) return result;
  for (const project of fs.readdirSync(projectsDir)) {
    const memDir = path.join(projectsDir, project, 'memory');
    if (!fs.existsSync(memDir)) continue;
    for (const file of fs.readdirSync(memDir)) {
      if (!file.endsWith('.md')) continue;
      result.push({ project, file, path: path.join(memDir, file) });
    }
  }
  // MEMORY.md (the index) first, then the rest alphabetically.
  return result.sort((a, b) =>
    (a.file === 'MEMORY.md' ? -1 : b.file === 'MEMORY.md' ? 1 : a.file.localeCompare(b.file))
  );
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 680,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  // The renderer can't touch the filesystem directly (contextIsolation),
  // so we expose exactly two operations over IPC.
  ipcMain.handle('scan-memory', () => {
    const items = scanMemory();
    console.log(`[scan] found ${items.length} memory files`);
    return items;
  });
  ipcMain.handle('read-memory', (_event, filePath) => {
    // Safety: only ever read files inside the memory tree.
    if (!filePath.startsWith(projectsDir)) throw new Error('out of scope');
    return fs.readFileSync(filePath, 'utf8');
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
