
export class Collection {
    private title: string
    private data: any[] = []

    constructor(title: string, data: any[]) {
        this.data = data
    }

    public getData(): any[] {
        return this.data
    }
}