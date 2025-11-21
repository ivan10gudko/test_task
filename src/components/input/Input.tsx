import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import styles from "./Input.module.css";

export interface InputProps {
    value: string | number;
    onChange: (value: string) => void;
    type?: "password" | "text" | "email" | "number";
    clearable?: boolean;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ({type = "text", clearable = false, label, placeholder = "", value, onChange, disabled}) => {

    const [inputType, setInputType] = useState<InputProps["type"]>(type);
    
    const currentType = type === "password" && inputType === "text" ? "text" : inputType;

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        const val = e.target.value;

        if (type === "number") {
            if (val === '' || /^-?\d*\.?\d*$/.test(val)) {
                onChange(val);
            }
            return;
        }

        onChange(val);
    }

    function handleClear(){
        onChange("");
    }

    function togglePasswordVisibility(){
        setInputType((prev) => (prev === "password" ? "text" : "password"));
    }


    return (
        <div className={styles.wrapper}>
            {label && <label className={styles.label}>{label}</label>}

            <div className={styles.inputWrapper}>
                <input
                    type={currentType}
                    value={value}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder={placeholder}
                    disabled={disabled}
                />

                <div className={styles.controls}>
                    {clearable && value.toString().length > 0 && !disabled && (
                        <button type="button" onClick={handleClear} className={styles.clearBtn}>
                            <IoMdClose />
                        </button>
                    )}

                    {type === "password" && (
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className={styles.visibilityBtn}
                        >
                            {currentType === "text" ? <LuEyeOff /> : <LuEye />}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Input;