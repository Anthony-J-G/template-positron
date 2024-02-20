import { app, shell, session, ipcMain, dialog, globalShortcut } from "electron";
import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import * as url from "url";
import { ElectronProcess } from "./setup";
import { addHandles } from "./handles";
import { getCurrentRenderer } from "./config";



const renderer_process: ElectronProcess = getCurrentRenderer();



//App LISTENERS
app.on("ready", async _ => {
  addHandles();
  renderer_process.Load();
  
});

//macOS exclusive, handles soft re-launches
app.on("activate", async _ => {
  if (!renderer_process.hasWindow()) {
    renderer_process.Load();
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