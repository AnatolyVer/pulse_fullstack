import { WebSocketServer} from 'ws';
import User from "./models/user.js";
const EVENT_CONNECTION = 'connection';
const EVENT_MESSAGE = 'message';
const EVENT_CLOSE = 'close';

class WebSocketManager {

    wss
    clients

    constructor(server) {
        this.wss = new WebSocketServer({ server });
        this.clients = {};

        this.wss.on(EVENT_CONNECTION, (socket, req) => this.onConnection(socket, req));
    }

    async onConnection(socket, req) {
        const _id = this.parseRequestParameters(req.url.substring(1));
        this.clients[_id] = socket
        await User.findOneAndUpdate({_id}, { $set: { online: true } })

        console.log('Connection is opened');

        socket.on(EVENT_MESSAGE, async (message) => {
            console.log(JSON.parse(message))
          /*  const { type, payload } = JSON.parse(message)
            const { projectId, id, data } = payload;
            try {
                switch (type) {

                }
            } catch (e) {
                console.error(e);
            }

            this.sendMessageToRoom(socket, projectId, JSON.stringify({ type, payload }));*/
        });

        socket.on(EVENT_CLOSE, () => this.closeSocket(socket));
    }

    parseRequestParameters(url){
        const [, id] = url.split('&')[0].split('=');
        return id;
    }

    /*getClientIDBySocket(socket){
        for (const id in this.clients) {
            if (this.clients.hasOwnProperty(id) && this.clients[id].socket === socket) {
                return id;
            }
        }
        return undefined;
    }*/

    async closeSocket(socket) {
        for (const key in this.clients) {
            if (this.clients[key] === socket) {
                await User.findOneAndUpdate({_id:key}, { $set: { online: false } })
                delete this.clients[key];
                console.log('Connection is closed');
                return;
            }
        }
    }
}

export default WebSocketManager;
