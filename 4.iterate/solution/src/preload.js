const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('scope', {
  scanMemory: () => ipcRenderer.invoke('scan-memory'),
  scanSkills: () => ipcRenderer.invoke('scan-skills'),
  read: (filePath) => ipcRenderer.invoke('read-file', filePath),
});
