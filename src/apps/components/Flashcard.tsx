import { Button } from "antd";
import { useState } from "react";
import { LeftCircleOutlined, RightCircleOutlined, FrownOutlined, SmileOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { FlashcardType } from "./FlashcardType";

interface FlashcardProps {
    width: number;
    height: number;
    data: FlashcardType;
    showBack: boolean;
    onShowBack: (showBack: boolean) => void;
}

export default function Flashcard({ width, height, data, showBack, onShowBack }: FlashcardProps) {

    return (
        <div className="fcard-container">
            <motion.div
                initial={{ x: 0 }}
                animate={{ x: showBack ? "-100%" : "0%" }}
                transition={{ type: "spring", stiffness: 100 }}
            >
                <div className="fcard" style={{ width, height }}>
                    <div className="fcard-content">
                        <div style={{ display: "block", textAlign: "center", fontSize: "3rem", fontWeight: "bold" }}>{data?.front}</div>
                    </div>
                    <div className="fcard-bottom">
                        <Button
                            className="fcard-btn-show"
                            shape="circle"
                            icon={<RightCircleOutlined />}
                            type="text"
                            style={{ fontSize: "1.25rem" }}
                            onClick={() => onShowBack(true)}
                        />
                    </div>

                </div>
            </motion.div>
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: showBack ? "0%" : "100%" }}
                transition={{ type: "spring", stiffness: 100 }}
            >
                <div className="fcard" style={{ width, height, display: showBack ? "flex" : "none" }}>
                    <div className="fcard-content">
                        <p>{data?.back}</p>
                    </div>
                    <div className="fcard-bottom">
                        <Button shape="circle" type="text" style={{ fontSize: "1.25rem" }} icon={<LeftCircleOutlined />} onClick={() => onShowBack(false)} />
                        <Button shape="circle" type="text" style={{ fontSize: "1.25rem" }} icon={<FrownOutlined />} onClick={() => window.service.submitResult("not ok", data?.collectionName, data)} />
                        <Button shape="circle" type="text" style={{ fontSize: "1.25rem" }} icon={<SmileOutlined />} onClick={() => window.service.submitResult("ok", data?.collectionName, data)} />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
