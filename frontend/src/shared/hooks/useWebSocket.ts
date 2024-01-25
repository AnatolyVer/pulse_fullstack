import { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeLastMessage} from "@redux/chatListSlice.ts";
import {RootState} from "@redux/store.ts";
import {addMessage as addMessageToCurrentChat} from "@redux/chatSlice.ts";

interface WSPayload {
    body:any
    type: "NEW_MESSAGE"
}

const useWebSocket = () => {

    const dispatch = useDispatch()
    const chat = useSelector((state: RootState) => state.chat);
    const [socket, setSocket] = useState<WebSocket | undefined>();

    const connect = (id: string) => {
        const newSocket = new WebSocket(`ws://localhost:3000?id=${id}`);

        newSocket.onmessage = (event) => {
            const payload:WSPayload = JSON.parse(event.data)
            switch (payload.type) {
                case "NEW_MESSAGE":
                    dispatch(changeLastMessage({chat_id:payload.body.chat_id, message: payload.body.message}))
                    if (chat._id === payload.body.chat_id) {
                        console.log("true")
                        dispatch(addMessageToCurrentChat(payload.body.message))
                    }
                    break;
            }
            console.log(payload)
        };

        newSocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        newSocket.onclose = () => {
            setSocket(undefined);
        };

        setSocket(newSocket)
    };

    const close = () => {
        if (socket?.readyState === WebSocket.OPEN){
            socket?.close();
        }
    };

    return { connect, close };
};

export default useWebSocket;
