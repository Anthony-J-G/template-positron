import * as fs from "fs";
import * as path from "path";
import { ipcMain } from "electron";



async function getAllFilesInDirectory(directoryPath: string): Promise<string[]> {
    try {
        const files = await fs.promises.readdir(directoryPath);
        return files.map(file => path.join(directoryPath, file));
    } catch (error) {
        console.error('Error reading directory:', error);
        return [];
    }
}

const DATA_PATH: string = "../Data/";