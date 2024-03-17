import { ipcMain } from "electron"
import { LaunchPython } from "./python";
import { getDemoTable, openDatabase } from "./sql";
import { handleFileOpen } from "./file"

const CppAddon = require("../../build/Release/NativeAddonInterface");


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