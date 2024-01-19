import {TMessage} from "@shared/interfaces/TMessage.ts";

import styles from './styles.module.scss'
import Message from "@pages/Main/ChatField/Message.tsx";

const MessageList = ({messages}:{messages:Array<TMessage>}) => {

    return (
        <div className={styles.MessageField}>
            {messages.length ? (
                <div className={styles.Messages}>
                    {messages.map((message: TMessage, index: number) => (
                        <Message key={index} message={message}/>
                    ))}
                </div>
            ) : (
                <h1>No messages found</h1>
            )}
        </div>
    );
};

export default MessageList;