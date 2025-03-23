import { CronJob } from 'cron';

export class Scheduler {
    private job: CronJob;

    constructor(task: () => void, cronTime: string) {
        this.job = new CronJob(cronTime, task, null, true);
    }

    public start(): void {
        if (!this.job.isActive) {
            this.job.start();
        }
    }

    public stop(): void {
        if (this.job.isActive) {
            this.job.stop();
        }
    }

    public updateSchedule(task: () => void, cronTime: string): void {
        this.stop();
        this.job = new CronJob(cronTime, task, null, true);
        this.start();
    }
}