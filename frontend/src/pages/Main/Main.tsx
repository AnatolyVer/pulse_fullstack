import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import styles from './styles.module.scss'
const Main = () => {

    const nav = useNavigate()

    const [isAuthed] = useState<boolean>(true)

    useEffect(() => {
        if (!isAuthed) nav('/sign_in')
    }, []);


    return (
        <div className={styles.Content}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Main;