
export class Collection {
    private name: string
    private data: any[] = []

    constructor(name: string, data: any[]) {
        this.name = name
        this.data = data
    }

    public getName(): string {
        return this.name
    }

    public getData(): any[] {
        return this.data
    }
}