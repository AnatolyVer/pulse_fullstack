import { useRef, useEffect } from "react";
import { format, isSameDay } from "date-fns";
import { TMessage } from "@shared/interfaces/TMessage.ts";
import Message from "@pages/Main/ChatField/Message.tsx";
import styles from './styles.module.scss';

const MessageList = ({ messages }: { messages: Array<TMessage> }) => {
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages.length]);

    return (
        <div className={styles.MessageField}>
            {messages.length ? (
                <div className={styles.Messages} ref={messagesContainerRef}>
                    {messages.map((message: TMessage, index: number) => {
                        const showDate = index > 0 && !isSameDay(new Date(messages[index - 1].time), new Date(message.time));
                        return (
                            <div key={index}>
                                {showDate && (
                                    <div className={styles.Date}>
                                        {format(new Date(message.time), 'dd MMM')}
                                    </div>
                                )}
                                <Message message={message} />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <h1>No messages found</h1>
            )}
        </div>
    );
};

export default MessageList;
