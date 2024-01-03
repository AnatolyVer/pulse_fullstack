import React, {useState} from "react";

import InputIcon from "@components/Input/InputIcon.tsx";
import {TInputType} from "@shared/interfaces/TInputType.ts";

import styles from "./styles.module.scss"

interface InputProps{
    value:string
    type: TInputType
    label:string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({value, type, label, onChange}:InputProps) => {


    const [isVisible, setIsVisible] = useState<boolean>(type == "text")
    const [inputType, setInputType] = useState<TInputType>(type)

    const showValue = () => {
        setIsVisible(prevState => !prevState)
        setInputType(!isVisible ? "text" : "password")
    }

    return (
        <div className={styles.Wrapper}>
            {label && <label htmlFor={label.toLowerCase()}>{label}</label>}
            <input type={inputType} name={label.toLowerCase()} id={label ? label.toLowerCase() : type} value={value} onChange={onChange}/>
            <InputIcon inputType={type} isVisible={isVisible} showValue={showValue}/>
        </div>
    );
};

export default Input;