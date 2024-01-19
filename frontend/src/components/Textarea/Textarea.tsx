import React from 'react';

import styles from './styles.module.scss'

interface TextareaProps{
    value:string
    label:string
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
    max?: number
}

const Textarea = ({value, label, onChange, max}:TextareaProps) => {

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>{
        const length = event.target.value.length
        if (max){
            if (length <= max) onChange(event)
        }
        else onChange(event)
    }

    return (
        <div className={styles.Wrapper}>
            {label && <label htmlFor={label.toLowerCase()}><strong>{label}</strong>: {value.length}/{max}</label>}
            <textarea name={label.toLowerCase()} value={value} cols={30} rows={3} onChange={handleChange}/>
        </div>
    );
};

export default Textarea;