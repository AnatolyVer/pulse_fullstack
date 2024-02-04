import { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeLastMessage} from "@redux/chatListSlice.ts";
import {RootState} from "@redux/store.ts";
import {addMessage} from "@redux/chatSlice.ts";

interface WSPayload {
    body:any
    type: "NEW_MESSAGE"
}

const useWebSocket = () => {

    const dispatch = useDispatch()
    const chat = useSelector((state: RootState) => state.chat);
    const [socket, setSocket] = useState<WebSocket | undefined>();

    const connect = (id: string) => {
        const newSocket = new WebSocket(`${import.meta.env.VITE_RESTAPI_WS_URL}?id=${id}`);

        newSocket.onmessage = (event) => {
            const payload:WSPayload = JSON.parse(event.data)
            switch (payload.type) {
                case "NEW_MESSAGE":
                    console.log(chat)
                    console.log(chat._id + " " + payload.body.chat_id)
                    dispatch(addMessage(payload.body))
                    dispatch(changeLastMessage({chat_id:payload.body.chat_id, message: payload.body.message}))
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
