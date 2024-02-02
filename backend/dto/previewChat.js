function cutTheMessage (message){
    if (message){
        if (message.text.length > 30) message.text = message.text.substring(0, 30 - 3) + '...';
        return message
    }
    else return {}
}

function unreadMessagesToString (unreadMessages){
    return unreadMessages > 99 ? "+99" : unreadMessages
}

export class PreviewChat{
    _id
    type
    image
    name
    online
    last_message
    unread_messages
    user
    constructor(chat, user_id, member) {
        this._id = chat._id
        this.type = chat.type
        this.user = member
        for (const member of chat.members){
            if (member._id.toString() !== user_id.toString()){
                
                this.image = member.avatar_url
                this.name = member.nickname
                this.online = member.online
            }
        }
        if (chat.messages){
            this.last_message = cutTheMessage(chat.messages[chat.messages.length - 1])
            this.unread_messages = unreadMessagesToString(chat.messages.length)
        }
        else {
            this.last_message = undefined
            this.unread_messages = "0"
        }
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
        this.type = chat.type
        for (const member of chat.members){
            if (member._id.toString() !== user_id.toString()){
                this.user = member
            }
        }

        this.unread_messages = unreadMessagesToString(chat.messages.length)
    }
}

