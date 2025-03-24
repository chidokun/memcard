export class Scheduler {
    private id: NodeJS.Timeout | undefined
    private task: () => void
    private minutes: number

    constructor(task: () => void, minutes: number) {
        this.task = task
        this.minutes = minutes
    }

    public start = () => {
        this.id = setInterval(this.task, this.minutes * 60 * 1000);
        console.log('Scheduler started: id =', this.id);
    }

    public stop = () => {
        clearInterval(this.id);
        this.id = undefined;
        console.log('Scheduler stopped: id =', this.id);
    }

    public updateSchedule = (task: () => void, minutes: number) => {
        this.stop();
        this.task = task;
        this.minutes = minutes;
        this.start();
    }
}