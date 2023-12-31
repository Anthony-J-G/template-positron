import { app, shell, session, ipcMain, BrowserWindow, globalShortcut, Menu, MenuItem } from "electron";
import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import * as url from "url";



export enum ConfigTypeFlags {
    None         = 0 << 0,
    Debug        = 1 << 0,
    Release      = 1 << 1,
    Distribution = 1 << 2,
}

export enum SourceTypeFlags {
    None         = 0 << 0,
    Remote       = 1 << 0,
    Local        = 1 << 1,
}



class EntryPoint {
    private entryPoint: string              = "";
    private source: SourceTypeFlags         = SourceTypeFlags.None;

    constructor(entry: string, src: SourceTypeFlags) {
        this.source = src;
        
        this.SetEntryPoint(entry);
        
    }

    GetEntryPoint(): string {
        return this.entryPoint;
    }

    private SetEntryPoint(newEntryPoint: string): boolean {
        if (this.source & SourceTypeFlags.Local && !fs.existsSync(newEntryPoint)) {
            console.log(this.source & SourceTypeFlags.Local);

            console.error("No release found");
    
            setTimeout(() => {
                app.quit();
            }, 0);
        
            throw Error("No Electron GUI found! Did you compile it properly?");
        }
        
        this.entryPoint = newEntryPoint;
        return true;
    }
}



export class ElectronProcess {
    private mainWindow: BrowserWindow      = null;
    private browserOptions: any     = null;
    private entryPoints: Object     = {};
  
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
            click: () => { this.mainWindow.webContents.openDevTools(); }
        }));

        subMenu.append(new MenuItem({
            label: 'Refresh GUI',
            accelerator: 'F5',
            click: () => { this.mainWindow.webContents.reload(); }
        }));
    }


    AddEntryPoint(entry: string, config: ConfigTypeFlags, src: SourceTypeFlags,) {
        if (this.entryPoints[config] != undefined) {
            console.error(`Entry Point for configuration already found`);
    
            setTimeout(() => {
                app.quit();
            }, 0);
        
            throw Error(`Entry point already exists for configuration of type: ${config}`);
        }

        this.entryPoints[config] = new EntryPoint(entry, src);
    }


    Load(config_type: ConfigTypeFlags): void {
        this.mainWindow = new BrowserWindow(this.browserOptions);
        const config = this.entryPoints[config_type];
        
        switch (config) {
            case undefined:
                console.error(`No Configuration of found of type: ${config_type}`);
    
                setTimeout(() => {
                    app.quit();
                }, 0);
            
                throw Error(`Improper Configuration Found: ${config_type}. Was the desired configuration added properly?`);

            default:
                this.mainWindow.loadURL(config.GetEntryPoint());
        }

        this.mainWindow.once('ready-to-show', () => {
            this.mainWindow.show();
        
            if (config & ConfigTypeFlags.Debug && !this.mainWindow.isMaximized()) {
                this.mainWindow.webContents.openDevTools();
            } //Open dev tools automatically if dev mode and not maximized
                
        });        
    }

  
    // Method to get the full name of the person
    hasWindow(): boolean {
        return !(this.mainWindow === null);
    }

}
