import Chat from "./Chat.tsx";

import {IChat} from "@shared/interfaces/IChat.ts";

import styles from './styles.module.scss'


interface ChatListProps {
    chats: Array<any>
}
const ChatList = ({chats}:ChatListProps) => {

    return (
        <div className={styles.ChatList}>
            {chats.length ? (
                chats.map((chat:IChat, index) => <Chat key={index} chat={chat}/>)
            ) :  (
                <h2>No chats found</h2>
            )}
        </div>
    );
};

export default ChatList;