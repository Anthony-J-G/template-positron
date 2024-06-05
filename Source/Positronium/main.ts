import { app, shell, session, ipcMain, dialog, globalShortcut } from "electron";
import * as os from "os";
import * as fs from "fs";
import * as url from "url";
import { getDemoTable, openDatabase } from "./sql";
import * as path from "path";

import { GetEditorConfig } from "./EntryPoints/astro";
import { buildEditorMenu } from "./Menus/editor"
import { RegisterHandles } from "handles";


const renderer_process = GetEditorConfig();


//App LISTENERS
app.on("ready", async _ => {
  RegisterHandles();

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