// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';
import { Flashcard } from './electron/collections/Flashcard';
contextBridge.exposeInMainWorld('service', {
    closeWindow: (name: string) => ipcRenderer.send('close-window', { name }),
    submitResult: (learningResult: any, collectionName: string, data: Flashcard) => ipcRenderer.send('submit-result', { learningResult, collectionName, data }),
    displayFlashcard: (callback: (data: any) => void) => ipcRenderer.on('display-flashcard', (event, data) => callback(data)),
});