import { dialog } from "electron";
import * as fs from 'fs';



const CVAR_FILE_NAME = "delver.json"



async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog({})
    if (!canceled) {
        return filePaths[0];
    }
}


function ValidateConsoleVariables(): boolean {
    return true;
}


function LoadConsoleVariable() {

}


function SaveConsoleVariable(cVarName: string, value: any): void {

}