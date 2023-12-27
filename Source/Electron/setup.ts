import { app, shell, session, ipcMain, BrowserWindow, globalShortcut, Menu, MenuItem } from "electron";
import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import * as url from "url";



export class ElectronProcess {
    win: BrowserWindow = null;
    isRelease: boolean = true;
    browserOptions: any;
  
    // Constructor to initialize the object with values
    constructor(browserOptions: any) {
        //Browser Window common options
        this.browserOptions = browserOptions;

        //Override menu (only need dev tools shortcut)
        let appMenu = new Menu();
        let subMenu = new Menu();

        subMenu.append(new MenuItem({
            label: 'Toggle Developer Tools',
            accelerator: os.platform() === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I',
            click: () => { this.win.webContents.openDevTools(); }
        }));

        subMenu.append(new MenuItem({
            label: 'Refresh GUI',
            accelerator: 'F5',
            click: () => { this.win.webContents.reload(); }
        }));


    }


    Load(isRelease: boolean) {

        this.win = new BrowserWindow(this.browserOptions);
        // this.win.setMenu(appMenu);

        if (!isRelease) {
            this.win.loadURL("http://localhost:4200/"); //Dev server

        } else { //Load release dist
    
            //Check if it exists first
            let indexPath = path.join(__dirname, '../../Binaries/GUI/index.html');
        
            if (!fs.existsSync(indexPath)) {
                console.error("No release found");
        
                setTimeout(() => {
                    app.quit();
                }, 0);
            
                throw Error("No Electron GUI found! Did you compile it properly?");
            }

            this.win.loadURL(
                indexPath
            );
        }
        
        ipcMain.on('set-title', (event, title) => {
            const webContents = event.sender
            const win = BrowserWindow.fromWebContents(webContents)
            win.setTitle(title)
        })

        this.win.once('ready-to-show', () => {
            this.win.show();
        
            if (!this.isRelease && !this.win.isMaximized()) {
                this.win.webContents.openDevTools();
            } //Open dev tools automatically if dev mode and not maximized
                
        });        
    }

  
    // Method to get the full name of the person
    hasWindow(): boolean {
        return !(this.win === null);
    }

}
