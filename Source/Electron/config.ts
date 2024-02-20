import { app } from "electron";
import * as path from "path";
import * as url from "url";
import { ElectronProcess, ConfigTypeFlags, SourceTypeFlags } from "./setup";

const angularBrowserOptions = { 
    icon: path.join(
        process.cwd(), 'Source/Angular/favicon.ico'
    ),
    // titleBarStyle: 'hidden',
    title: 'Positron Template Project', 
    opacity: 1.00, 
    backgroundColor: '#965BAE',
    minWidth: 880, 
    minHeight: 680,
    width: 961,
    height: 888,
    show: false, 
    webPreferences: { 
        preload: path.resolve(
        app.getAppPath(), 'Source/Angular/preload.js'
        ),
        sandbox: false,
        nodeIntegration: false, 
        contextIsolation: true,
        webviewTag: false, 
    } 
};
const angular_process: ElectronProcess = new ElectronProcess(angularBrowserOptions);
angular_process.AddEntryPoint(
    'http://localhost:4200', ConfigTypeFlags.Debug, SourceTypeFlags.Remote
);
angular_process.AddEntryPoint(
    path.join(__dirname, '../../Binaries/GUI/index.html'), ConfigTypeFlags.Release, SourceTypeFlags.Local
);


export function getCurrentRenderer() {
    return angular_process
}
  
