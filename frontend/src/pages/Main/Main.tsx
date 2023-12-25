import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import styles from './styles.module.scss'
import {useSelector} from "react-redux";
const Main = () => {

    const nav = useNavigate()

    const [isAuthed] = useState<boolean>(localStorage.getItem("id") !== null)

    const user = useSelector((state: any)  => state.user)

    useEffect(() => {
        if (!isAuthed) nav('/sign_in')
    }, [user]);


    return (
        <div className={styles.Content}>
           {/* <div style={{width:"27%"}}></div>
            <div style={{width:"46%"}}></div>
            <ProfileBar user = {user}/>*/}
        </div>
    );
};

export default Main;