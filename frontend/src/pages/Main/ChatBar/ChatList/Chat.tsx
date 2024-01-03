import dayjs from "dayjs"

import {Avatar} from "@mui/material";

import styles from './styles.module.scss'

const Chat = ({chat}:any) => {

    const cutTheMessage = (message: string) => {
        if (message.length <= 30) return message;
        else return message.substring(0, 30 - 3) + '...';
    }

    const unreadMessagesToString = (unreadMessages: number) =>{
        if (unreadMessages > 99) return "+99"
        return unreadMessages
    }

    return (
        <div className={styles.Chat}>
           <div className={styles.Main}>
               <Avatar sx={{width:"60px", height:"60px"}} alt={"A"}/>
               <div className={styles.Message}>
                   <p>{chat}</p>
                   <p>{cutTheMessage("Message")}</p>
               </div>
           </div>
            <div className={styles.Info}>
                <p>{dayjs().format("HH:mm")}</p>
                <div className={styles.UnreadMessages}>{unreadMessagesToString(chat)}</div>
            </div>
        </div>

    );
};

export default Chat;