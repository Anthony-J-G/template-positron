// Copyright Anthony J. Guarino. All Rights Reserved.
// Astronomy.ts

import { app, ipcMain } from "electron";
import * as fs from "fs";
import * as path from "path";
import { AddHandles } from "../handles";


const addonPath = path.resolve(
    app.getAppPath(), "build/Release/AddonInterface.node"
)
console.log(addonPath)
const AddonAPI = require(addonPath);



/*
    Ok so in theory I want to be able to call/create a function here that 
    modifies the "IpcHandleManager" so that before the Electron process, the
    handles get added.
*/

AddHandles("astronomy", () => {
    console.log(AddonAPI.getContextName());

    // Meant for reading in JSON data
    ipcMain.handle('astronomy:ReadGravSystem', async (event, path: string) => {
        // Do a basic check to see if the path is Valid
        try {
            const isFile: boolean = fs.statSync(path).isFile();
        } catch (err) {
            // Handle error, such as file not found
            console.error(err);
            return false;
        }

        // If it is then initialize GravSystem
        return await AddonAPI.initGravSystem(path);
    });

    /*
    ipcMain.handle('cpp:execute-demo-func', async (event, number1: number, number2: number) => {
        return await CppAddon.addNumbers(number1, number2);
    });
    */
});



