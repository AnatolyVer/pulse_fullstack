export default class chatDto{
    _id
    messages
    members
    type
    constructor(chat) {
        this._id = chat._id
        this.messages = chat.messages
        this.members = chat.members
        this.type = chat.type
    }
}