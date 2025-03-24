import { CollectionManager } from "../collections/CollectionManager"
import { RemindPolicy } from "./RemindPolicy"
import { Flashcard } from "../collections/Flashcard"
export class RandomRemindPolicy implements RemindPolicy {
    private collectionManager: CollectionManager

    constructor(collectionManager: CollectionManager) {
        this.collectionManager = collectionManager
    }

    nextRemind(): Flashcard {
        const collection = this.collectionManager.getCurrentCollection()
        const randomIndex = Math.floor(Math.random() * collection.getData().length)
        
        const data = collection.getData()[randomIndex]
        return {
            collectionName: collection.getName(),
            id: data["id"],
            front: data["korean"],
            back: data["vietnamese"],
        }
    }
}