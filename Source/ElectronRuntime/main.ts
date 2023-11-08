import { app, shell, session, ipcMain, BrowserWindow, globalShortcut, Menu, MenuItem } from "electron";
import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import * as url from "url";



var win: BrowserWindow;
var isRelease: boolean = true;

function createApp() {

  //Browser Window common options
  let browserOptions = { 
    icon: path.join(__dirname, '../src/assets/icon/png/64x64.png'), 
    title: 'Positron Template Project', 
    opacity: 1.00, 
    backgroundColor: '#000000', 
    minWidth: 880, 
    minHeight: 680, 
    width: 961, 
    height: 888,
    show: false, 
    webPreferences: { 
      sandbox: false, 
      nodeIntegration: false, 
      contextIsolation: true, 
      webviewTag: false, 
    } 
  };

  //Override menu (only need dev tools shortcut)
  let appMenu = new Menu();
  let subMenu = new Menu();

  subMenu.append(new MenuItem({
    label: 'Toggle Developer Tools',
    accelerator: os.platform() === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I',
    click: () => { win.webContents.openDevTools(); }
  }));

  subMenu.append(new MenuItem({
    label: 'Refresh GUI',
    accelerator: 'F5',
    click: () => { win.webContents.reload(); }
  }));


  win = new BrowserWindow(browserOptions);
  win.setMenu(appMenu);

  if (!isRelease) {
    win.loadURL("http://localhost:4200/"); //Dev server
  }
  else { //Load release dist

    //Check if it exists first
    let indexPath = path.join(__dirname, '../../Binaries/GUI/index.html');

    if (!fs.existsSync(indexPath)) {

      console.error("No release found");

      setTimeout(() => {
        app.quit();
      }, 0);

      throw Error("No Electron GUI found! Did you compile it properly?");
    }
    
    ipcMain.on('set-title', (event, title) => {
      const webContents = event.sender
      const win = BrowserWindow.fromWebContents(webContents)
      win.setTitle(title)
    })
  
    win.loadURL(
      indexPath
    );
  }

  win.once('ready-to-show', () => {
    win.show();

    if (!isRelease && !win.isMaximized()) //Open dev tools automatically if dev mode and not maximized
      win.webContents.openDevTools();
  });

}

//App LISTENERS
app.on("ready", createApp);

//macOS exclusive, handles soft re-launches
app.on("activate", () => {
  if (win === null) {
    createApp();
  }
});

app.on("window-all-closed", () => {

  //Ensures the electron process always shuts down properly if all windows have been closed
  //Don't do this on macOS as users expect to be able to re-launch the app quickly from the dock after all windows get closed
  if (os.platform() != "darwin") {

    setTimeout(() => {
      app.quit();
    }, 1000);
  }
});


// IPC Main LISTENERS
ipcMain.on('message-from-renderer', (event, arg) => {
  // Handle the message from the renderer process
  // You can send a response back to the renderer process if needed
  event.sender.send('message-to-renderer', 'This is a response from main process');
});