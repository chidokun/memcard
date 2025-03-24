import { FlashcardType } from "../components/FlashcardType";

declare global {
    interface Window {
        service: {
            closeWindow: (name: string) => void;
            displayFlashcard: (callback: (data: any) => void) => void;
            submitResult: (learningResult: any, collectionName: string, data: FlashcardType) => void;
        };
    }
}