import User from "../models/user.js";
import Chat from "../models/chat.js";
import userDto from "../dto/userDto.js";
import chatDto from "../dto/chatDto.js";
import {CryptoService} from "./cryptoService.js";

export default class ChatService{

    static async getAll(_id, substr){
        try {
            const user = await User.findById(_id)
            const chatsToSend = []
            for (const chat_id of user.chats){
                let chat = await this.getOne(_id, chat_id)
                if (substr !== ""){
                    if (chat.user.nickname.toLowerCase().includes(substr.toLowerCase())){
                        const messages = []
                        for (const message of chat.messages){
                            const text = CryptoService.decrypt(message.text)
                            messages.push({...message, text})
                            chat = {...chat, messages}
                        }
                        chatsToSend.push(chat)
                    }
                }
                else {
                    const messages = []
                    for (const message of chat.messages){
                        const text = CryptoService.decrypt(message.text)
                        messages.push({...message, text})
                        chat = {...chat, messages}
                    }
                    chatsToSend.push(chat)
                }
            }
            return chatsToSend
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async getOne(user_id, _id) {
        try {
            const chat = await Chat.findById(_id)
            let chatToSend = {}
            for (const member_id of chat.members) {
                if (member_id.toString() !== user_id.toString()){
                    const member = await User.findById(member_id)
                    const chatDTO = new chatDto(chat)
                    chatToSend = {...chatDTO, user:new userDto(member), type:"chat"}
                }
            }
            return chatToSend
        }catch (e){
            throw new Error(e.message)
        }
    }

    static async sendMessage(_id, message) {
        try {
            if (_id !== "undefined"){
                const chat = await Chat.findById(_id)
                const text = CryptoService.encrypt(message.text)
                chat.messages.push({...message, text})
                await chat.save()
                return {message: "Message sent"}
            }
            else{
                return {message: "Create new chat"}
            }
        }catch (e) {
            console.log(e.message)
            throw new Error("Chat not found")
        }
    }

    static async create(user_id, users) {
        try {
            const {_id} = await Chat.create({members: users, type: "chat"})
            for (const id of users) {
                const user = await User.findById(id)
                user.chats.push(_id)
                await user.save()
            }
            return this.getOne(user_id, _id)
        }catch (e) {
            console.log(e.message)
            throw new Error(e.message)
        }
    }
}