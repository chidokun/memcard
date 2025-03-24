import { Flashcard } from "../collections/Flashcard";

export interface RemindPolicy {
    nextRemind(): Flashcard
}