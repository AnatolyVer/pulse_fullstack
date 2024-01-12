import { useState } from 'react';
import { IWSMessage } from "@shared/interfaces/IWSMessage.ts";

const useWebSocket = () => {
    const [socket, setSocket] = useState<WebSocket | undefined>();

    const connect = (id: string) => {
        const newSocket = new WebSocket(`ws://localhost:3000?id=${id}`);

        newSocket.onmessage = (event) => {
            getMessage(event.data);
        };

        newSocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        newSocket.onclose = () => {
            setSocket(undefined);
        };

        setSocket(newSocket)
    };

    const getMessage = (message: IWSMessage) => {
        console.log(message);
    };

    const close = () => {
        if (socket?.readyState === WebSocket.OPEN){
            socket?.close();
        }
    };

    return { connect, getMessage, close };
};

export default useWebSocket;
