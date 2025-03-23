import { App, BrowserWindow } from 'electron'
import { TrayMenu } from './TrayMenu'
import { Window } from './Window'
import { AppConfig } from './configs/AppConfig'
import { CollectionManager } from './collections/CollectionManager'
import { ReminderManager } from './reminder/ReminderManager'
import { RandomRemindPolicy } from './reminder/RandomRemindPolicy'


class AppManager {
    private trayMenu!: TrayMenu
    private windowManager: Map<string, Window>
    private runtimeConfigManager: Map<string, any>
    private userConfigManager: AppConfig
    private collectionManager: CollectionManager
    private reminderManager: ReminderManager

    public initialize(): void {
        this.windowManager = new Map()
        this.runtimeConfigManager = new Map()
        this.userConfigManager = new AppConfig()
        this.collectionManager = new CollectionManager()
        
        this.reminderManager = this.loadReminderManager()

        this.trayMenu = new TrayMenu()

        this.collectionManager.setAfterCollectionLoading(() => {
            this.trayMenu.reloadContextMenu()
            this.reminderManager.setCollection(this.collectionManager.getCollection(this.userConfigManager.get('currentCollection')))
        })
    }

    private loadReminderManager(): ReminderManager {
        const reminderManager = new ReminderManager()
        console.log(this)

        reminderManager.setRemindPolicy(new RandomRemindPolicy())

        const defaultCollection = this.userConfigManager.get('currentCollection')
        const collection = this.collectionManager.getCollection(defaultCollection)
        reminderManager.setCollection(collection)
        console.log(this)
        
        reminderManager.setRemindTime(this.userConfigManager.get('reminderTimeMinutes'))

        return reminderManager
    }

    setTray(tray: TrayMenu): void {
        this.trayMenu = tray
    }

    getTray(): TrayMenu {
        return this.trayMenu
    }

    setConfig(name: string, value: any): void {
        this.runtimeConfigManager.set(name, value)
    }

    getConfig(name: string): any {
        const value = this.runtimeConfigManager.get(name)
        if (value) {
            return value
        }
        throw new Error(`[AppManager] - Config with name ${name} doesn't exist!`)
    }

    setWindow(name: string, element: Window): void {
        this.windowManager.set(name, element)
    }

    getWindow(name: string): Window {
        const element = this.windowManager.get(name)
        return element
        // if (element) {
        //     return element
        // }
        // throw new Error(`[AppManager] - Element with name ${name} doesn't exist!`)
    }

    deleteWindow(name: string): void {
        this.windowManager.delete(name)
    }

    getCollectionNames(): string[] {
        return this.collectionManager.getCollectionNames()
    }

    getConnectionManager(): CollectionManager {
        return this.collectionManager
    }

    getUserConfig(): AppConfig {
        return this.userConfigManager
    }
}

export const appManager = new AppManager()