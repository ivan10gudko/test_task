import React, { useEffect, useState } from "react";
import { IoMdClose, IoMdCheckmarkCircle, IoMdWarning, IoMdInformationCircle, IoMdAlert } from "react-icons/io";
import styles from "./Toast.module.css";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
    message: string;
    type?: ToastType;
    duration?: number;
    closeButton?:boolean;
    onClose: () => void;
}

const icons = {
    success: <IoMdCheckmarkCircle color="#2ecc71" size={24}/>,
    error: <IoMdAlert color="#e74c3c" size={24}/>,
    warning: <IoMdWarning color="#f1c40f" size={24}/>,
    info: <IoMdInformationCircle color="#3498db" size={24}/>,
};

const Toast: React.FC<ToastProps>= ({message, type = "info", duration = 3000, onClose, closeButton=true}) => {
    const [isClosing, setIsClosing] = useState<boolean>(false);

    function startClosingAnimation(){
        setIsClosing(true);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            startClosingAnimation();
    }, duration);

    return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={`${styles.toast} ${styles[type]} ${isClosing ? styles.closing : ""}`}
            onAnimationEnd={() => {
                if (isClosing) {
                    onClose();
                }
            }}
        >
            <div className={styles.icon}>{icons[type]}</div>
            <span className={styles.message}>{message}</span>
            {closeButton &&
            <button onClick={startClosingAnimation} className={styles.closeBtn}>
                <IoMdClose />
            </button>
                }
    </div>
    );
};

export default Toast;