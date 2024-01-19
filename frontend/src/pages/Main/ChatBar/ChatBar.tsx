import SearchBar from "../ChatBar/SearchBar/SearchBar.tsx";
import ChatList from "./ChatList/ChatList";

import styles from "./styles.module.scss"


const ChatBar = () => {

    return (
        <div className={styles.ChatBar}>
            <SearchBar/>
            <ChatList/>
        </div>
    );
};

export default ChatBar;