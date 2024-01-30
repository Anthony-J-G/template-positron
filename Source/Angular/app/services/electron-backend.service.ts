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

  canUseElectron(): boolean {
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


  async fetchDemoTable(): Promise<string> {
    if (!this.canUseElectron()) {
      console.error("Electron API doesn't exist!");
      throw Error("Electron API not initialized");
    }
    return await this.electronApi.getTable();

  }


  async runCppFunction(num1: number, num2: number): Promise<number> {
    if (!this.canUseElectron()) {
      console.error("Electron API doesn't exist!");
      throw Error("Electron API not initialized");
    }
    console.log(num1);
    return await this.electronApi.runAddon(num1, num2);
  }


  async queryFilePath(): Promise<string> {
    if (!this.canUseElectron()) {
      console.error("Electron API doesn't exist!");
      throw Error("Electron API not initialized");
    }
    return await this.electronApi.openFile();

  }

}
