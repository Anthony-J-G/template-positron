
// Import the child_process module
import { spawn } from 'child_process';
import { ipcMain } from 'electron';


export function addPythonHandles() {
    ipcMain.handle('python:test-script', async () => {
        LaunchPython("Source/Python/main.py", []);
    });

}


export function LaunchPython(script: string, argv: Array<string>): void  {
    // Spawn a new Python process
    const pythonProcess = spawn('python', [script, ...argv]);

    // Capture standard output and error
    pythonProcess.stdout.on('data', (data) => {
        console.log(`Python script output: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error from Python script: ${data}`);
    });

    // Handle process termination
    pythonProcess.on('close', (code) => {
        console.log(`Python script exited with code ${code}`);
    });

}