import { Flashcard } from "./Flashcard";

export interface CollectionColumn {
    name: string;
    type: string;
}

export interface CollectionFlashcard {
    id: string;
    front: string;
    back: string;
}

export interface CollectionDataSource {
    type: string;
    format: string;
    path: string;
    columns: CollectionColumn[];
    flashcards: CollectionFlashcard[];
}

export class Collection {
    private id: string;
    private name: string;
    private version: string;
    private author: string;
    private author_email: string;
    private description: string;
    private data: CollectionDataSource[];
    private flashcards: Flashcard[] = [];

    constructor(id: string, flashcards: Flashcard[]) {
        this.id = id;
        this.flashcards = flashcards;
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getVersion(): string {
        return this.version;
    }

    public getAuthor(): string {
        return this.author;
    }

    public getAuthorEmail(): string {
        return this.author_email;
    }

    public getDescription(): string {
        return this.description;
    }

    public getDataSources(): CollectionDataSource[] {
        return this.data;
    }

    public getFlashcards(): Flashcard[] {
        return this.flashcards;
    }

    public setMetadata(metadata: {
        name: string;
        version: string;
        author: string;
        author_email: string;
        description: string;
        data: CollectionDataSource[];
    }): void {
        this.name = metadata.name;
        this.version = metadata.version;
        this.author = metadata.author;
        this.author_email = metadata.author_email;
        this.description = metadata.description;
        this.data = metadata.data;
    }
}