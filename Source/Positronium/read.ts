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


export function addTempHandles(): void {
    ipcMain.handle('delver:get-characters', async () => {
        return await fetchCharacters();
    });
}


async function fetchCharacters(): Promise<Array<any>> {
    let character_list: Array<any> = [];

    let character_files = []
    await getAllFilesInDirectory(DATA_PATH)
        .then((files) => { character_files = files; })
        .catch(error => console.error('Error:', error));

    let character_JSONs = []
    for (let file of character_files) {
        if (new RegExp("(.json)$", 'gim').test(file)) {
            character_JSONs.push(file);
        }
    }
    
    // console.log(`Found ${character_JSONs.length} Character JSONs in '${DATA_PATH}'`);
    
    for (let file of character_JSONs) {
        // Asynchronous file read
        await new Promise((resolve, reject) => {
            fs.readFile(file, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(data));
                }
            });
        })
            .then((data) => { character_list.push(data) })
            .catch(error => console.error('Error:', error));

    }
    
    return character_list;
}