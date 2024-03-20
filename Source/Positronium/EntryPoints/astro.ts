import * as path from "path";
import { ElectronProcess, ConfigTypeFlags, SourceTypeFlags } from "../setup";
import { app } from "electron";


const delverAstro = { 
  icon: path.join(
    process.cwd(), 'Source/Editor/favicon.ico'
  ),
  // titleBarStyle: 'hidden',
  title: 'Playground',
  opacity: 1.00,
  backgroundColor: '#965BAE',
  minWidth: 880,
  minHeight: 680,
  width: 961,
  height: 888,
  show: false,
  webPreferences: {
    preload: path.resolve(
      app.getAppPath(), 'Source/Astro/preload.js'
    ),
    sandbox: false,
    nodeIntegration: false, 
    contextIsolation: true,
    webviewTag: false, 
  }
};
const astro_renderer_process: ElectronProcess = new ElectronProcess(delverAstro);
astro_renderer_process.AddEntryPoint(
  'http://localhost:4321', ConfigTypeFlags.Debug, SourceTypeFlags.Remote
);
astro_renderer_process.AddEntryPoint(
  path.join(app.getAppPath(), 'Binaries/Astro/index.html'), ConfigTypeFlags.Release, SourceTypeFlags.Local
);


export function GetEditorConfig() {
  return astro_renderer_process;
}

