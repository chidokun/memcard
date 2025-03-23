import { createRoot } from 'react-dom/client'
import { FlashcardPage } from './apps/pages/FlashcardPage'

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<FlashcardPage />);