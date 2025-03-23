import { Collection } from "../collections/Collection";
import { RemindPolicy } from "./RemindPolicy";

export class RandomRemindPolicy implements RemindPolicy {
    private collection: Collection

    setCollection(collection: Collection): void {
        this.collection = collection
    }

    nextRemind(): any {
        const randomIndex = Math.floor(Math.random() * this.collection.getData().length)
        return this.collection.getData()[randomIndex]
    }
}