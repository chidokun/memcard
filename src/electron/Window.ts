import { BrowserWindow } from "electron"

export abstract class Window {
    public readonly window: BrowserWindow
    constructor(window: BrowserWindow = undefined) {
        if (window) {
            this.window = window
        } else {
            this.window = this.createWindow()
        }
    }
    getWindow(): BrowserWindow {
        return this.window
    }

    getWindowSize(): { width: number, height: number } {
        let size = this.window.getSize()
        return { width: size[0], height: size[1] }
    }
    show(): void {
        this.window.show()
    }
    hide(): void {
        this.window.hide()
    }

    abstract createWindow(): BrowserWindow
}