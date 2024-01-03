import React, {useState} from 'react';

import Input from '@components/Input/Input.tsx';

import styles from "./styles.module.scss"

const SearchBar = () => {

    const [inputValue, setInputValue] = useState<string>("")

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    return (
        <div className={styles.SearchBar}>
            <Input value={inputValue} onChange={handleSearchInputChange} label={"Search"} type={"search"}/>
        </div>
    );
};

export default SearchBar;