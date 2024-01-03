import SearchBar from "../ChatBar/SearchBar/SearchBar.tsx";
import ChatList from "./ChatList/ChatList";

import styles from "./styles.module.scss"

const ChatBar = () => {

    const chats: any[] = []

    return (
        <div className={styles.ChatBar}>
            <SearchBar/>
            <ChatList chats={chats}/>
        </div>
    );
};

export default ChatBar;