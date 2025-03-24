import ElectronStore from 'electron-store';
import Store from 'electron-store';

export type Config = {
    reminderTimeMinutes: number
    reminderEnable: boolean
    currentCollection: string
}

export class AppConfig {
    private store: ElectronStore<Config>;

    constructor() {
        this.store = new Store<Config>({
            schema: {
                reminderTimeMinutes: {
                    type: 'number',
                    minimum: 1,
                    maximum: 60,
                    default: 10
                },
                reminderEnable: {
                    type: 'boolean',
                    default: true
                },
                currentCollection: {
                    type: 'string',
                    default: 'korean_vocabulary'
                }
            }
        });
    }

    get(key: string): any {
        return this.store.get(key);
    }

    set(key: string, value: any): void {
        this.store.set(key, value);
    }
}

export const appConfig = new AppConfig();