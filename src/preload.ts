// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('service', {
    closeWindow: (name: string) => ipcRenderer.send('close-window', { name }),
    submitResult: (learningResult: any, collectionName: string, cardData: any) => ipcRenderer.send('submit-result', { learningResult, collectionName, cardData }),
});