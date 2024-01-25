import { useState, useEffect } from 'react';
import {useDispatch} from "react-redux";
import debounce from 'lodash.debounce';

import {getChats} from "@api/getChats.ts";
import Input from '@components/Input/Input.tsx';
import {loadChats} from "@redux/chatListSlice.ts";

import styles from "./styles.module.scss";

const SearchBar = () => {

    const dispatch = useDispatch()

    const [inputValue, setInputValue] = useState<string>("");

    const debouncedSearch = debounce(async (value: string) => {
        try {
            const chats = (await getChats(value)).data
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
            <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} label={"Search"} type={"search"}/>
        </div>
    );
};

export default SearchBar;
