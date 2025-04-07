import fs from 'fs'
import path from 'path'
import csv from 'csv-parser'
import { appConfig } from '../configs/AppConfig'
import { Collection } from './Collection'
import { Flashcard } from './Flashcard'

export class CollectionManager {
    private collectionsDir: string
    private collectionsMap: Map<string, Collection> = new Map()
    protected afterCollectionLoading: () => void

    constructor() {
        this.collectionsDir = path.join(__dirname, 'collections')
        this.loadAllCollections().then((collections) => {
            this.collectionsMap = collections
            this.afterCollectionLoading()
        })
    }

    public loadAllCollections = async (): Promise<Map<string, Collection>> => {
        const collections = new Map<string, Collection>()
        const collectionDirs = fs.readdirSync(this.collectionsDir)

        for (const collectionDir of collectionDirs) {
            const collectionPath = path.join(this.collectionsDir, collectionDir)

            if (!fs.statSync(collectionPath).isDirectory()) {
                continue
            }

            const configPath = path.join(collectionPath, 'collection.json')

            if (!fs.existsSync(configPath)) {
                continue
            }

            try {
                const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'))
                const collectionId = configData.id

                let flashcards: Flashcard[] = []
                for (const dataSource of configData.data) {
                    if (dataSource.type === 'file' && dataSource.format === 'csv') {
                        const dataPath = path.join(collectionPath, dataSource.path)
                        if (!fs.existsSync(dataPath)) {
                            continue
                        }

                        const sourceData = await this.loadCollection(dataPath)

                        const flashCardConfig = dataSource.flashcards
                        flashcards = flashcards.concat(sourceData.map((data: any) => ({
                                collectionName: configData.name,
                                id: data[flashCardConfig.id],
                                front: data[flashCardConfig.front],
                                back: data[flashCardConfig.back],
                            } as Flashcard)))    
                    }
                }

                const collection = new Collection(collectionId, flashcards)
                collection.setMetadata(configData)
                collections.set(collectionId, collection)
            } catch (error) {
                console.error(`Error loading collection ${collectionDir}:`, error)
            }

        }

        return collections
    }

    private loadCollection = (filePath: string): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            const results: any[] = []
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (error) => reject(error))
        })
    }

    public getAllCollections = (): Map<string, Collection> => {
        return this.collectionsMap
    }

    public getCurrentCollection = (): Collection => {
        let currentCollection = appConfig.get('currentCollection')
        return this.collectionsMap.get(currentCollection)
    }

    public getCollection = (collectionName: string): Collection => {
        return this.collectionsMap.get(collectionName)
    }

    public setAfterCollectionLoading = (callback: () => void): void => {
        this.afterCollectionLoading = callback
    }
}