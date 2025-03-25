import { app, screen, BrowserWindow } from 'electron'
import { Window } from '../Window'
import { appManager } from '../AppManager'

export class FlashcardWindow extends Window {

    createWindow(): BrowserWindow {
        const window = new BrowserWindow({
            title: "Memcard",
            height: 150,
            width: 400,
            show: false,
            webPreferences: {
                preload: appManager.getConfig('MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY')
            },
            transparent: true,
            backgroundColor: "#00000000",
            vibrancy: "under-window",
            visualEffectState: "followWindow",
            frame: false
        })

        if (process.platform === "darwin") {
            window.setVibrancy("under-window")
        }
        if (process.platform === "win32") {
            window.setBackgroundMaterial("acrylic")
        }

        // Set window position
        const primaryDisplay = screen.getPrimaryDisplay()
        const padding = 0
        const { width, height } = primaryDisplay.workAreaSize
        if (process.platform === 'darwin') {
            window.setPosition(width - window.getBounds().width - padding, padding)
        } else {
            window.setPosition(width - window.getBounds().width, height - window.getBounds().height)
        }

        // Load our index.html
        window.loadURL(appManager.getConfig('MAIN_WINDOW_WEBPACK_ENTRY'))
        window.setAlwaysOnTop(true, 'floating', 1)

        return window
    }
}