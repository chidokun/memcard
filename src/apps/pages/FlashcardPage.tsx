import React, { useState } from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Flashcard from '../components/Flashcard';

declare global {
    interface Window {
        service: {
            closeWindow: (name: string) => void;
        };
    }
}

export const FlashcardPage: React.FC = () => {
    const [closeVisible, setCloseVisible] = useState(false);
    return (
        <div onMouseOver={() => setCloseVisible(true)}
            onMouseLeave={() => setCloseVisible(false)}
        >
            <div className="fcard-close" style={{visibility: closeVisible ? "visible" : "hidden"}}>
                <Button type="text" shape="circle" icon={<CloseOutlined />} onClick={() => window.service.closeWindow("FlashcardWindow")}/>
            </div>

            <Flashcard width={window.innerWidth} height={window.innerHeight} />
        </div>

    );
};