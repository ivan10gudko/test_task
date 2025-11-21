import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";

import styles from "./Input.module.css";

interface Props {
    type: "password" | "text" | "email" | "number";
    clearable?: boolean;
    label?: string;
    placeholder?: string;
}

const Input: React.FC<Props> = ({
    type = "text",
    clearable = false,
    label,
    placeholder = "",
}) => {
    const [value, setValue] = useState<string>("");
    const [inputType, setInputType] = useState<Props["type"]>(type);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        const val = e.target.value;
    
        if (type === "number") {
            if (/^-?\d*\.?\d*$/.test(val)) {
                setValue(val);
            }
            return;
        }

        setValue(val);
    };

    function  handleClear(){
        setValue("");
    };

    function togglePasswordVisibility(){
        setInputType((prev) => (prev === "password" ? "text" : "password"));
    };

    return (
        <div className={styles.wrapper}>
            {label && <label>{label}</label>}

            <div className={styles.inputWrapper}>
                <input
                    type={inputType}
                    value={value}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder={placeholder}
                />

                <div className={styles.controls}>
                    {clearable && value.length > 0 && (
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
                            {inputType === "password" ? <LuEye /> : <LuEyeOff />}
                        </button>
                    )}
                </div>
            </div>
    </div>
);
}

export default Input;
