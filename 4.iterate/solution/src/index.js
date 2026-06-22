const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');

if (require('electron-squirrel-startup')) {
  app.quit();
}

// Two things Claude Code keeps under your home folder:
const projectsDir = path.join(os.homedir(), '.claude', 'projects'); // memory lives here
const skillsDir = path.join(os.homedir(), '.claude', 'skills'); // personal skills live here

function scanMemory() {
  const result = [];
  if (!fs.existsSync(projectsDir)) return result;
  for (const project of fs.readdirSync(projectsDir)) {
    const memDir = path.join(projectsDir, project, 'memory');
    if (!fs.existsSync(memDir)) continue;
    for (const file of fs.readdirSync(memDir)) {
      if (!file.endsWith('.md')) continue;
      result.push({ group: project, name: file, path: path.join(memDir, file) });
    }
  }
  return result.sort((a, b) =>
    a.name === 'MEMORY.md' ? -1 : b.name === 'MEMORY.md' ? 1 : a.name.localeCompare(b.name)
  );
}

function scanSkills() {
  const result = [];
  if (!fs.existsSync(skillsDir)) return result;
  for (const name of fs.readdirSync(skillsDir)) {
    const skillFile = path.join(skillsDir, name, 'SKILL.md');
    if (fs.existsSync(skillFile)) {
      result.push({ group: 'skill', name, path: skillFile });
    }
  }
  return result.sort((a, b) => a.name.localeCompare(b.name));
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 680,
    webPreferences: { preload: path.join(__dirname, 'preload.js') },
  });
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  ipcMain.handle('scan-memory', () => {
    const items = scanMemory();
    console.log(`[scan] ${items.length} memory files`);
    return items;
  });
  ipcMain.handle('scan-skills', () => {
    const items = scanSkills();
    console.log(`[scan] ${items.length} skills`);
    return items;
  });
  ipcMain.handle('read-file', (_event, filePath) => {
    // Safety: only read inside the memory or skills trees.
    if (!filePath.startsWith(projectsDir) && !filePath.startsWith(skillsDir)) {
      throw new Error('out of scope');
    }
    return fs.readFileSync(filePath, 'utf8');
  });

  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
