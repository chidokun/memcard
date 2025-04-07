import { app, Tray, Menu, nativeImage } from 'electron';
import { appManager } from './AppManager';
import { appConfig } from './configs/AppConfig';
import path from 'path';

export class TrayMenu {
    public readonly tray: Tray;
    private iconPath: string = '/assets/tray/tray-icon-Template.png';

    constructor() {
        this.tray = new Tray(this.createNativeImage());
        this.tray.setContextMenu(this.createMenu());
    }

    public reloadContextMenu(): void {
        this.tray.setContextMenu(this.createMenu());
    }

    createNativeImage() {
        let imgPath = path.join(__dirname, this.iconPath);

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
        const collectionMap = appManager.getAllCollections()
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
                    Array.from(collectionMap.keys()).map(id => ({
                        label: collectionMap.get(id)?.getName(),
                        type: 'radio',
                        checked: appConfig.get('currentCollection') === id,
                        click: () => {
                            appConfig.set('currentCollection', id);
                        }
                    })))
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