import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import ChatBar from "@pages/Main/ChatBar/ChatBar.tsx";
import ProfileBar from "@pages/Main/ProfileBar/ProfileBar.tsx";

import styles from './styles.module.scss'

const Main = () => {

    const nav = useNavigate()

    const [isAuthed] = useState<boolean>(localStorage.getItem("id") !== null)

    const user = useSelector((state: any)  => state.user)

    useEffect(() => {
        if (!isAuthed) nav('/sign_in')
    }, [user]);


    return (
        <div className={styles.Content}>
            <ChatBar/>
            <ProfileBar user = {user}/>
        </div>
    );
};

export default Main;