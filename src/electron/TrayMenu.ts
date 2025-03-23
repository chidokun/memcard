import { app, Tray, Menu, nativeImage } from 'electron';
import { appManager } from './AppManager';

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
        const userConfig = appManager.getUserConfig();
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
                            checked: userConfig.get('currentCollection') === collectionName,
                            click: () => {
                                userConfig.set('currentCollection', collectionName);
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
                        label: '5 phút',
                        type: 'radio',
                        checked: userConfig.get('reminderTimeMinutes') === 5,
                        click: () => {
                            userConfig.set('reminderTimeMinutes', 5);
                        }
                    },
                    {
                        label: '10 phút',
                        type: 'radio',
                        checked: userConfig.get('reminderTimeMinutes') === 10,
                        click: () => {
                            userConfig.set('reminderTimeMinutes', 10);
                        }
                    },
                    {
                        label: '15 phút',
                        type: 'radio',
                        checked: userConfig.get('reminderTimeMinutes') === 15,
                        click: () => {
                            userConfig.set('reminderTimeMinutes', 15);
                        }
                    },
                    {
                        label: '30 phút',
                        type: 'radio',
                        checked: userConfig.get('reminderTimeMinutes') === 30,
                        click: () => {
                            userConfig.set('reminderTimeMinutes', 30);
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
                checked: !userConfig.get('reminderEnable'),
                click: () => {
                    userConfig.set('reminderEnable', false);
                }
            },
            {
                label: 'Tiếp tục nhắc nhở',
                type: 'radio',
                checked: userConfig.get('reminderEnable'),
                click: () => {
                    userConfig.set('reminderEnable', true);
                }
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