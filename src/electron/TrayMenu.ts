import { app, Tray, Menu, nativeImage } from 'electron';
import { appManager } from './AppManager';
import { appConfig } from './configs/AppConfig';
import path from 'path';

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
        let imgPath: string;
        
        if (app.isPackaged) {
            // Trong môi trường production (đã đóng gói)
            imgPath = path.join(__dirname, this.iconPath);
            console.log('Production path:', {
                resourcesPath: process.resourcesPath,
                iconPath: this.iconPath,
                fullPath: imgPath
            });
        } else {
            // Trong môi trường development
            imgPath = path.join(__dirname, this.iconPath);
            console.log('Development path:', {
                appPath: app.getAppPath(),
                iconPath: this.iconPath,
                fullPath: imgPath
            });
        }

        try {
            const image = nativeImage.createFromPath(imgPath);
            if (image.isEmpty()) {
                console.error('Image is empty at path:', imgPath);
                return null;
            }
            // Marks the image as a template image.
            image.setTemplateImage(true);
            return image;
        } catch (error) {
            console.error('Error creating native image:', error);
            return null;
        }
    }

    createMenu(): Menu {
        const contextMenu = Menu.buildFromTemplate([
            {
                label: 'Nhắc thẻ tiếp theo',
                type: 'normal',
                click: appManager.handleNextRemind
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
            }, {
                label: 'Chế độ nhắc',
                type: 'submenu',
                submenu: Menu.buildFromTemplate([
                    {
                        label: 'Ngẫu nhiên',
                        type: 'radio',
                        checked: true
                    }
                ])
            },
            {
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
        return contextMenu;
    }
}