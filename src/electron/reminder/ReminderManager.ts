import { Collection } from '../collections/Collection';
import { RemindPolicy } from './RemindPolicy';
import { Scheduler } from './Scheduler';

export class ReminderManager {
    private scheduler: Scheduler
    private collection: Collection
    private currentRemindPolicy: RemindPolicy
    private currentRemindTime: number



    private getCronTime(): string {
        const minutes = this.currentRemindTime;
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${remainingMinutes} ${hours} * * *`;
    }

    public setRemindTime(minutes: number): void {
        this.currentRemindTime = minutes;
    }

    public setCollection(collection: Collection): void {
        this.collection = collection;
        this.currentRemindPolicy.setCollection(collection);
    }

    public setRemindPolicy(policy: RemindPolicy): void {
        this.currentRemindPolicy = policy;
        this.currentRemindPolicy.setCollection(this.collection);
    }

    remind(): void {
        this.currentRemindPolicy.nextRemind()
    }
}