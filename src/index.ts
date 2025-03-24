import { app, BrowserWindow, screen, ipcMain } from 'electron';
import { appManager } from './electron/AppManager';
import { TrayMenu } from './electron/TrayMenu';
import { FlashcardWindow } from './electron/flashcard/FlashcardWindow';
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

app.dock.hide();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

app.on('ready', () => {
    appManager.initialize();
    appManager.setConfig('MAIN_WINDOW_WEBPACK_ENTRY', MAIN_WINDOW_WEBPACK_ENTRY);
    appManager.setConfig('MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY', MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY);
    appManager.setWindow('FlashcardWindow', new FlashcardWindow());
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    // if (BrowserWindow.getAllWindows().length === 0) {
    //     createWindow();
    // }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on('close-window', (event, data) => {
    if (data) {
        const { name } = data
        appManager.getWindow(name).hide();
    }
});

