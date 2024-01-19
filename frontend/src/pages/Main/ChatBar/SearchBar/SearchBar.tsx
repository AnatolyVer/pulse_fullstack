import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

import {getChats} from "@api/getChats.ts";
import Input from '@components/Input/Input.tsx';

import styles from "./styles.module.scss";
import {useDispatch} from "react-redux";
import {loadChats} from "@redux/chatListSlice.ts";

const SearchBar = () => {

    const dispatch = useDispatch()

    const [inputValue, setInputValue] = useState<string>("");


    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const debouncedSearch = debounce(async (value: string) => {
        try {
            const chats = (await getChats(value)).data
            console.log(chats)
            dispatch(loadChats(chats))
        }
        catch (e){
            console.log(e)
        }
    }, 300);

    useEffect(() => {
        debouncedSearch(inputValue);
        return () => {
            debouncedSearch.cancel();
        };
    }, [inputValue]);


    return (
        <div className={styles.SearchBar}>
            <Input value={inputValue} onChange={handleSearchInputChange} label={"Search"} type={"search"}/>
        </div>
    );
};

export default SearchBar;
