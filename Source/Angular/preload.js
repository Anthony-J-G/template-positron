const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('api', {
  getTable:       () => ipcRenderer.invoke('sql:get-demo'),
  pingMain:       () => ipcRenderer.send('ping-main'),
  openFile:       () => ipcRenderer.invoke('dialog:openFile'),
  launchPython:   () => ipcRenderer.invoke('python:test-script'),
});
