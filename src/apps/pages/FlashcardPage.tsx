import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Flashcard from '../components/Flashcard';
import { FlashcardType } from '../components/FlashcardType';

export const FlashcardPage: React.FC = () => {
    const [showBack, setShowBack] = useState(false);
    const [closeVisible, setCloseVisible] = useState(false);
    const [flashcardData, setFlashcardData] = useState<FlashcardType>(undefined);

    useEffect(() => {
        window.service.displayFlashcard((data: FlashcardType) => {
            setFlashcardData(data);
            setShowBack(false);
        });
    }, []);

    return (
        <div onMouseOver={() => setCloseVisible(true)}
            onMouseLeave={() => setCloseVisible(false)}
            className="fcard-container"
        >
            <div className="fcard-close" style={{visibility: closeVisible ? "visible" : "hidden"}}>
                <Button type="text" shape="circle" icon={<CloseOutlined />} onClick={() => window.service.closeWindow("FlashcardWindow")}/>
            </div>

            <Flashcard width={window.innerWidth} height={window.innerHeight} data={flashcardData} showBack={showBack} onShowBack={setShowBack} />
        </div>

    );
};