import { app, BrowserWindow } from 'electron';
const addon = require('bindings')('libpositron');


const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600
    })
  
    win.loadFile('renderers/vanilla/index.html')
}


app.whenReady().then(() => {
  createWindow();
  console.log('binding.hello() =', addon.hello());
})