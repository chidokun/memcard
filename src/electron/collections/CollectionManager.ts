import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { Collection } from './Collection';

export class CollectionManager {
    private collectionsDir: string;
    private collectionsMap: Map<string, Collection> = new Map();
    protected afterCollectionLoading: () => void;

    constructor() {
        this.collectionsDir = path.join(__dirname, 'collections');
        this.loadAllCollections().then((collections) => {
            this.collectionsMap = collections;
            this.afterCollectionLoading();
        });
    }

    public async loadAllCollections(): Promise<Map<string, Collection>> {
        const collections = new Map<string, Collection>();
        const files = fs.readdirSync(this.collectionsDir);

        for (const file of files) {
            if (path.extname(file) === '.csv') {
                const collectionName = path.basename(file, '.csv');
                const collectionData = await this.loadCollection(path.join(this.collectionsDir, file));
                collections.set(collectionName, new Collection(collectionName, collectionData));
            }
        }

        return collections;
    }

    private loadCollection(filePath: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const results: any[] = [];
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (error) => reject(error));
        });
    }

    public getCollectionNames(): string[] {
        return Array.from(this.collectionsMap.keys()) || [];
    }

    public getCollection(collectionName: string): Collection {   
        return this.collectionsMap.get(collectionName);
    }

    public setAfterCollectionLoading(callback: () => void): void {
        this.afterCollectionLoading = callback;
    }
}