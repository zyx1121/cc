const { contextBridge, ipcRenderer } = require('electron');

// Hand the renderer a tiny, safe API instead of raw Node access.
contextBridge.exposeInMainWorld('scope', {
  scan: () => ipcRenderer.invoke('scan-memory'),
  read: (filePath) => ipcRenderer.invoke('read-memory', filePath),
});
