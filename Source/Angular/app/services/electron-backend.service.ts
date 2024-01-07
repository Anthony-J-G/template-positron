import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElectronBackendService {

  private electronApi: any = null;

  constructor(private window: Window) {
    type api = keyof Window;
    if (this.window['api' as api] !== undefined) {
      this.electronApi = this.window['api' as api];
    }
  }

  canUseElectron() {
    return !(this.electronApi === null);
  }

  ping(): void {
    if (!this.canUseElectron()) {
      console.log("Electron API doesn't exist!");
      return
    }
    
    this.electronApi.pingMain();
  }


  async runPythonFile(): Promise<string> {
    if (!this.canUseElectron()) {
      console.error("Electron API doesn't exist!");
      throw Error("Electron API not initialized");
    }
    return await this.electronApi.launchPython();

  }


  async queryFilePath(): Promise<string> {
    if (!this.canUseElectron()) {
      console.error("Electron API doesn't exist!");
      throw Error("Electron API not initialized");
    }
    return await this.electronApi.openFile();

  }

}
