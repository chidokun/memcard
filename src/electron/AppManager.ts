import { App, BrowserWindow } from 'electron'
import { TrayMenu } from './TrayMenu'
import { Window } from './Window'
import { appConfig, AppConfig } from './configs/AppConfig'
import { CollectionManager } from './collections/CollectionManager'
import { ReminderManager } from './reminder/ReminderManager'
import { RandomRemindPolicy } from './reminder/RandomRemindPolicy'


class AppManager {
    private trayMenu!: TrayMenu
    private windowManager: Map<string, Window>
    private runtimeConfigManager: Map<string, any>
    private collectionManager: CollectionManager
    private reminderManager: ReminderManager

    public initialize(): void {
        this.windowManager = new Map()
        this.runtimeConfigManager = new Map()
        this.collectionManager = new CollectionManager()
        
        this.reminderManager = this.loadReminderManager()

        this.trayMenu = new TrayMenu()

        this.collectionManager.setAfterCollectionLoading(() => {
            this.trayMenu.reloadContextMenu()
        })

        const reminderEnable = appConfig.get('reminderEnable')
        if (reminderEnable) {
            this.reminderManager.startRemind()
        }
    }

    private loadReminderManager(): ReminderManager {
        const remindPolicy = new RandomRemindPolicy(this.collectionManager)
        const reminderManager = new ReminderManager(remindPolicy)

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

    reloadReminder = () => {
        this.reminderManager.stopRemind()
        const reminderEnable = appConfig.get('reminderEnable')
        if (reminderEnable) {  
            this.reminderManager.startRemind()
        }
    }

    handleEnableRemider = () => {
        const reminderEnable = appConfig.get('reminderEnable')
        if (!reminderEnable) {
            appConfig.set('reminderEnable', true)

            this.reminderManager.startRemind()
        }
    }

    handleDisableRemider = () => {
        const reminderEnable = appConfig.get('reminderEnable')
        if (reminderEnable) {
            appConfig.set('reminderEnable', false)
            this.reminderManager.stopRemind()
        }
    }

    handleSetReminderTime = (minutes: number) => {
        appConfig.set('reminderTimeMinutes', minutes)
        this.reminderManager.reloadReminderTime()
    }

    handleNextRemind = () => {
        this.reminderManager.remind()
    }
}

export const appManager = new AppManager()