const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('api', {
  runAddon:       (number1, number2) => ipcRenderer.invoke('cpp:execute-demo-func', number1, number2),
  getTable:       () => ipcRenderer.invoke('sql:get-demo'),
  pingMain:       () => ipcRenderer.send('ping-main'),
  openFile:       () => ipcRenderer.invoke('dialog:openFile'),
  launchPython:   () => ipcRenderer.invoke('python:test-script'),
});
