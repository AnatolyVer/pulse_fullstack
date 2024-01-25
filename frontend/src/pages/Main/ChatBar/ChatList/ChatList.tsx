import { useSelector } from "react-redux";
import { RootState } from "@redux/store.ts";
import Chat from "./Chat.tsx";
import {IPreviewChat} from "@shared/interfaces/IChat.ts";

import styles from './styles.module.scss';

const ChatList = () => {

    const chats = useSelector((state: RootState) => state.chatList);

    return (
        <div className={styles.ChatList}>
            {(chats &&chats.length) ? (
                chats.map((chat: IPreviewChat) => <Chat key={chat._id} chat={chat} />)
            ) : (
                <h2>No chats found</h2>
            )}
        </div>
    );
};

export default ChatList;
