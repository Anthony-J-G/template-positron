import { ipcMain } from "electron"
import { LaunchPython } from "./python";
import { getDemoTable, openDatabase } from "./sql";
import { handleFileOpen } from "./file"

const CppAddon = require("../../build/Release/NativeAddonInterface");

class IpcHandleManager {
    /**
     * When building a scalable application, the amount of interactions between the Renderer 
     * Processes launched by Electron and the Main Process tend to increase dramatically. This
     * object is designed to assist with that.
     * 
     * @param parameters 
    **/

    public functions: Map<string, any> = new Map();

    constructor(parameters) {
        
    }

}


const gHandleManager: IpcHandleManager = new IpcHandleManager(1);


export function AddHandles(name: string, functionPtr) {
    /**
     * Allows for a client Renderer Process that uses Positron
     * to easily ensure that it's handles are registered before
     * the RendererProcess is started.
     * 
     * @param functionPtr Function to call that initializes each 
    **/

    gHandleManager.functions.set(name, functionPtr);
}


export function RegisterHandles() {
    /**
     * 
    **/

    gHandleManager.functions.forEach(element => {
        element();
    });


}


export function addHandles(): void {

    // C++ Handles
    ipcMain.handle('cpp:execute-demo-func', async (event, number1: number, number2: number) => {
        return await CppAddon.addNumbers(number1, number2);
    });

    // File IO Handles
    ipcMain.handle('dialog:openFile', (event, ...args) => {
        return handleFileOpen();
    });

    // SQL Handles
    ipcMain.handle('sql:get-demo', async () => {
        return await getDemoTable();
    });
    
    // Python Handles
    ipcMain.handle('python:test-script', async () => {
        LaunchPython("Source/Python/main.py", []);
    });

    // Demo Ping Handle
    ipcMain.on('ping-main', async () => {
        console.log("Hello from Renderer Process in Main Process!");
    }) 
    
}