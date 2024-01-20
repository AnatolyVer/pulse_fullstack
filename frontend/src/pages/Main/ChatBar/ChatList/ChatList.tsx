import Chat from "./Chat.tsx";

import styles from './styles.module.scss'
import User from "@pages/Main/ChatBar/ChatList/User.tsx";
import {useSelector} from "react-redux";
import {RootState} from "@redux/store.ts";
import {IChat} from "@shared/interfaces/IChat.ts";
import IUser from "@shared/interfaces/IUser.ts";

const ChatList = () => {

    const chats = useSelector((state : RootState) => state.chatList)

    return (
        <div className={styles.ChatList}>
            {chats && chats.length ? (
                chats.map((chat:IChat | IUser, index) => {
                    return chat.type === "user" ? (
                        <User key={index} user={chat as IUser}/>
                    ) : (
                        <Chat key={index} chat={chat as IChat}/>
                    )
                })
            ) :  (
                <h2>No chats found</h2>
            )}
        </div>
    );
};

export default ChatList;