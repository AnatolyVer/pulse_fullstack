import React from 'react';

import styles from './styles.module.scss'

interface TextareaProps{
    value:string
    label:string
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const Textarea = ({value, label, onChange}:TextareaProps) => {

    return (
        <div className={styles.Wrapper}>
            {label && <label htmlFor={label.toLowerCase()}>{label}</label>}
            <textarea name={label.toLowerCase()} value={value} cols={30} rows={3} onChange={onChange}/>
        </div>
    );
};

export default Textarea;