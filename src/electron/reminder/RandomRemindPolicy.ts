import { CollectionManager } from "../collections/CollectionManager"
import { RemindPolicy } from "./RemindPolicy"

export class RandomRemindPolicy implements RemindPolicy {
    private collectionManager: CollectionManager

    constructor(collectionManager: CollectionManager) {
        this.collectionManager = collectionManager
    }

    nextRemind(): any {
        const collection = this.collectionManager.getCurrentCollection()
        const randomIndex = Math.floor(Math.random() * collection.getData().length)
        
        return collection.getData()[randomIndex]
    }
}