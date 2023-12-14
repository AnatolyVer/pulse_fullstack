import React, {useState} from "react";

import styles from "./styles.module.scss"
import EyeSwitcher from "../EyeSwitcher/EyeSwitcher.tsx";

interface InputProps{
    value:string
    type:string
    label:string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({value, type, label, onChange}:InputProps) => {


    const [isVisible, setIsVisible] = useState<boolean>(type == "text")
    const [inputType, setInputType] = useState<string>(type)

    const showValue = () => {
        setIsVisible(prevState => !prevState)
        setInputType(!isVisible ? "text" : "password")
    }

    return (
        <div className={styles.Wrapper}>
            <label htmlFor={label.toLowerCase()}>{label}</label>
            <input type={inputType} id={label.toLowerCase()} value={value} onChange={onChange} />
            {type == "password" && <EyeSwitcher visible={isVisible} onClick={showValue}/>}
        </div>
    );
};

export default Input;