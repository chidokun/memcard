import { CollectionManager } from '../collections/CollectionManager'
import { RemindPolicy } from './RemindPolicy'
import { Scheduler } from './Scheduler'
import { appConfig } from '../configs/AppConfig'
import { appManager } from '../AppManager'

export class ReminderManager {
    private scheduler: Scheduler
    private reminderPolicy: RemindPolicy

    constructor(remindPolicy: RemindPolicy) {
        this.reminderPolicy = remindPolicy
        this.scheduler = new Scheduler(this.remind, appConfig.get('reminderTimeMinutes'))
    }

    public startRemind = () => {
        this.scheduler.start()
    }

    public stopRemind = () => {
        this.scheduler.stop()
    }

    public reloadReminderTime = () => {
        this.scheduler.updateSchedule(this.remind, appConfig.get('reminderTimeMinutes'))
    }

    public remind = () => {
        // TODO
        console.log('Remind: ', new Date())
        const window = appManager.getWindow('FlashcardWindow')
        window.show()
        this.reminderPolicy.nextRemind()
    }
}