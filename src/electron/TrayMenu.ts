import { app, Tray, Menu, nativeImage } from 'electron';
import { appManager } from './AppManager';
import { appConfig } from './configs/AppConfig';

export class TrayMenu {
    // Create a variable to store our tray
    // Public: Make it accessible outside of the class;
    // Readonly: Value can't be changed
    public readonly tray: Tray;

    // Path where should we fetch our icon;
    private iconPath: string = '/assets/tray/tray-icon.png';


    constructor() {
        this.tray = new Tray(this.createNativeImage());
        this.tray.setContextMenu(this.createMenu());
    }

    public reloadContextMenu(): void {
        this.tray.setContextMenu(this.createMenu());
    }

    createNativeImage() {
        // Since we never know where the app is installed,
        // we need to add the app base path to it.
        const path = `${app.getAppPath()}/src${this.iconPath}`;
        console.log(path);
        const image = nativeImage.createFromPath(path);
        // Marks the image as a template image.
        image.setTemplateImage(true);
        return image;
    }

    createMenu(): Menu {
        const contextMenu = Menu.buildFromTemplate([
            {
                label: 'Nhắc thẻ tiếp theo',
                type: 'normal',
                click: () => {
                    /* Later this will open the Main Window */
                    appManager.getWindow('FlashcardWindow').show();
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Bộ thẻ',
                type: 'submenu',
                submenu: Menu.buildFromTemplate(
                    appManager.getCollectionNames().map((collectionName) => {
                        return {
                            label: collectionName,
                            type: 'radio',
                            checked: appConfig.get('currentCollection') === collectionName,
                            click: () => {
                                appConfig.set('currentCollection', collectionName);
                            }
                        }
                    }))
            }, {
                type: 'separator'
            },
            {
                label: 'Nhắc nhở mỗi',
                type: 'submenu',
                submenu: Menu.buildFromTemplate([
                    {
                        label: '1 phút',
                        type: 'radio',
                        checked: appConfig.get('reminderTimeMinutes') === 1,
                        click: () => {
                            appManager.handleSetReminderTime(1);
                        }
                    },
                    {
                        label: '5 phút',
                        type: 'radio',
                        checked: appConfig.get('reminderTimeMinutes') === 5,
                        click: () => {
                            appManager.handleSetReminderTime(5);
                        }
                    },
                    {
                        label: '10 phút',
                        type: 'radio',
                        checked: appConfig.get('reminderTimeMinutes') === 10,
                        click: () => {
                            appManager.handleSetReminderTime(10);
                        }
                    },
                    {
                        label: '15 phút',
                        type: 'radio',
                        checked: appConfig.get('reminderTimeMinutes') === 15,
                        click: () => {
                            appManager.handleSetReminderTime(15);
                        }
                    },
                    {
                        label: '30 phút',
                        type: 'radio',
                        checked: appConfig.get('reminderTimeMinutes') === 30,
                        click: () => {
                            appManager.handleSetReminderTime(30);
                        }
                    }
                ])
            },
            {
                type: 'separator'
            },
            {
                label: 'Tạm dừng nhắc nhở',
                type: 'radio',
                checked: appConfig.get('reminderEnable') === false,
                click: appManager.handleDisableRemider
            },
            {
                label: 'Tiếp tục nhắc nhở',
                type: 'radio',
                checked: appConfig.get('reminderEnable') === true,
                click: appManager.handleEnableRemider
            },
            {
                type: 'separator'
            },
            {
                label: 'Thoát',
                type: 'normal',
                click: () => app.quit()
            }
        ]);
        console.log(appConfig.get('reminderEnable'))
        return contextMenu;
    }
}