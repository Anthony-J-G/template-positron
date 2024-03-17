const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('api', {
  runAddon:       (number1, number2) => ipcRenderer.invoke('cpp:execute-demo-func', number1, number2),
  readGravSystem: (path) => ipcRenderer.invoke('astronomy:ReadGravSystem', path),
});
