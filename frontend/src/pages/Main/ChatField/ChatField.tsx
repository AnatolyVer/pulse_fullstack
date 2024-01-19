import {useDispatch, useSelector} from "react-redux";

import CustomAvatar from "@components/CustomAvatar/CustomAvatar.tsx";
import {convertDate} from "@shared/utils/convertDate.ts";

import Input from "@components/Input/Input";
import React, {useState} from "react";
import useSnackBar from "@components/SnackBar/useSnackBar.tsx";
import useProtectedAxios from "@shared/hooks/useProtectedAxios.tsx";
import {addMessage, openChat} from "@redux/chatSlice.ts";
import {sendMessage} from "@api/sendMessage.ts";
import {TMessage} from "@shared/interfaces/TMessage.ts";
import dayjs from "dayjs";
import styles from './styles.module.scss'
import MessageList from "@pages/Main/ChatField/MessageList.tsx";

import SendIcon from '@mui/icons-material/Send';
import { createChat } from "@api/createChat";
import {RootState} from "@redux/store.ts";
const ChatField = () => {

    const chat = useSelector((state: RootState) => state.chat);
    const user = useSelector((state: RootState) => state.user);

    const [message, setMessage] = useState<string>("")

    const dispatch = useDispatch()

    const [openSnackBar,] = useSnackBar()
    const [protectedAxiosRequest,] = useProtectedAxios()

    const onSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (message.length){
                const messageToSend:TMessage = {
                    author: user?.['_id']!,
                    text:(event.target as any).elements[0].value,
                    time:dayjs().format("HH:mm"),
                    delivered:false,
                    read:false
                }
                const {message} = (await protectedAxiosRequest(() => sendMessage(messageToSend, chat._id!)))!.data
                if (message === "Create new chat"){
                    const res = await protectedAxiosRequest(() => createChat([user?.['_id']!, chat.user?._id!]))
                    dispatch(openChat(res!.data))
                    console.log(res!.data)
                    await protectedAxiosRequest(() => sendMessage(messageToSend, res!.data._id!))
                }
                messageToSend.delivered = true
                dispatch(addMessage(messageToSend))
                setMessage("")
            }
        }
        catch (e: any) {
            console.log(e)
            openSnackBar(e.message)
        }
    }

    return (
        chat && chat.user && (
            <div className={styles.ChatField}>
                <div className={styles.ChatFieldHeader}>
                    <CustomAvatar sx={{ width: "60px", height: "60px" }} online={chat.user.online} src={chat.user.avatar_url} alt={chat.user.nickname} />
                    <div className={styles.User}>
                        <p>{chat.user.nickname}</p>
                        <p>{chat.user.online ? "online" : convertDate(chat.user.last_seen!)}</p>
                    </div>
                </div>
                <MessageList messages={chat.messages}/>
                <div className={styles.ChatInput}>
                    <form onSubmit={onSubmit}>
                        <Input value={message} onChange={(e) => setMessage(e.target.value)} type={"text"} label={""}/>
                        <button type={"submit"} className={styles.Send}>
                            <SendIcon/>
                        </button>
                    </form>
                </div>
            </div>
        )
    );
};

export default ChatField;

