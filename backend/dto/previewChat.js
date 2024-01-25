import ChatService from "../services/ChatService.js";
import {CryptoService} from "../services/cryptoService.js";

export class PreviewChat{
    _id
    type
    image
    name
    online
    last_message
    unread_messages
    constructor(chat, user_id) {
        this._id = chat._id
        this.type = chat.type
        for (const member of chat.members){
            if (member._id.toString() !== user_id.toString()){
                this.image = member.avatar_url
                this.name = member.nickname
                this.online = member.online
            }
        }
        this.last_message = ChatService.cutTheMessage(chat.messages[chat.messages.length - 1])
        this.unread_messages = ChatService.unreadMessagesToString(chat.messages.length)
    }
}

export class FullChat{
    _id
    messages
    user
    type
    online
    unread_messages
    constructor(chat, user_id) {
        this._id = chat._id
        this.messages = chat.messages
        this.members = chat.members
        this.type = chat.type
        for (const member of chat.members){
            if (member._id.toString() !== user_id.toString()){
                this.user = member
            }
        }

        this.unread_messages = ChatService.unreadMessagesToString(chat.messages.length)
    }
}