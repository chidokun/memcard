import { Card, Button } from "antd";
import { useState } from "react";
import { LeftCircleOutlined, RightCircleOutlined, FrownOutlined, SmileOutlined, CloseOutlined } from "@ant-design/icons";
import { motion } from "motion/react";
import { app } from "electron";
import { appManager } from "../../electron/AppManager";

interface FlashcardProps {
    width: number;
    height: number;
}

export default function Flashcard({ width, height }: FlashcardProps) {
    const [showSecondCard, setShowSecondCard] = useState(false);

    return (
        <div>
            <motion.div
                initial={{ x: 0 }}
                animate={{ x: showSecondCard ? "-100%" : "0%" }}
                transition={{ type: "spring", stiffness: 100 }}
            >
                <div className="fcard" style={{ width, height }}>
                    <div className="fcard-content">
                    <div style={{ display: "block", textAlign: "center", fontSize: "3rem", fontWeight: "bold" }}>이를 닦다</div>
                    </div>
                    <div className="fcard-bottom">
                        <Button
                            shape="circle"
                            icon={<RightCircleOutlined />}
                            type="text"
                            style={{ fontSize: "1.25rem" }}
                            onClick={() => setShowSecondCard(true)}
                        />
                    </div>

                </div>
            </motion.div>
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: showSecondCard ? "0%" : "100%" }}
                transition={{ type: "spring", stiffness: 100 }}
            >
                <div className="fcard" style={{ width, height }}>
                    <div className="fcard-content">
                        <p>đánh răng</p>
                    </div>
                    <div className="fcard-bottom">
                        <Button shape="circle" type="text" style={{ fontSize: "1.25rem" }} icon={<LeftCircleOutlined />} onClick={() => setShowSecondCard(false)} />
                        <Button shape="circle" type="text" style={{ fontSize: "1.25rem" }} icon={<FrownOutlined />} />
                        <Button shape="circle" type="text" style={{ fontSize: "1.25rem" }} icon={<SmileOutlined />} />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
