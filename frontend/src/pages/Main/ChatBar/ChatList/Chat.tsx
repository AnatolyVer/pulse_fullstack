import dayjs from "dayjs"

import styles from './styles.module.scss'
import {IChat} from "@shared/interfaces/IChat.ts";
import CustomAvatar from "@components/CustomAvatar/CustomAvatar.tsx";
import {openChat} from "@redux/chatSlice.ts";
import {useDispatch} from "react-redux";
import {IMessage} from "@shared/interfaces/IMessage.ts";

const Chat = ({chat}: {chat:IChat}) => {

    const dispatch  = useDispatch()


    const cutTheMessage = (message: IMessage):string => {
        if (message){
            if (message.text.length <= 30) return message.text;
            else return message.text.substring(0, 30 - 3) + '...';
        }
        else return ""
    }

    const unreadMessagesToString = (unreadMessages: number) =>{
        if (unreadMessages > 99) return "+99"
        return unreadMessages
    }

    return (
        <div onClick={() => dispatch(openChat(chat))} className={styles.Chat}>
           <div className={styles.Main}>
               <CustomAvatar sx={{width:"60px", height:"60px"}} src={chat.user?.avatar_url} alt={chat.user?.nickname}/>
               <div className={styles.Message}>
                   <p>{chat.user?.nickname}</p>
                   <p>{cutTheMessage(chat.messages[chat.messages?.length - 1])}</p>
               </div>
           </div>
            <div className={styles.Info}>
                <p>{dayjs().format("HH:mm")}</p>
                <div className={styles.UnreadMessages}>{unreadMessagesToString(chat.messages!.length)}</div>
            </div>
        </div>

    );
};

export default Chat;