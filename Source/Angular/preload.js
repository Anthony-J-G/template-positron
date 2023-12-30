const { contextBridge, ipcRenderer } = require('electron')

console.log("Preload Script Loaded Properly! :D");

contextBridge.exposeInMainWorld('api', {
  pingMain: () => ipcRenderer.send('ping-main'),
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})
