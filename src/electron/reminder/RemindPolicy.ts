import { Collection } from "../collections/Collection"

export interface RemindPolicy {
    setCollection(collection: Collection): void
    nextRemind(): any
}