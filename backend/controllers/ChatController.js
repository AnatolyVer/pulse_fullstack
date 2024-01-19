import jwt from "jsonwebtoken";
import chatService from "../services/ChatService.js";

export default class ChatController {

    static async getAll(req, res) {
        try {
            const {_id} = jwt.decode(req.headers['refresh-token'])
            const {substr} = req.query
            const chats = await chatService.getAll(_id, substr)
            res.status(200).json(chats)
        } catch (err) {
            console.error(err);
            res.status(404).send(err)
        }
        return res
    }


    static async getOne(req, res) {
        try{
            const {_id} = jwt.decode(req.headers['refresh-token'])
            const {username} = req.query
            const chat = await chatService.getOne(_id, username)
            return res.status(200).json(chat)
        }catch (e) {
            res.status(500).end(e.message)
        }
        return res
    }

    static async sendMessage(req, res) {
        try{
            const message = req.body
            const {_id} = req.query
            const result = await chatService.sendMessage(_id, message)
            return res.status(200).json(result)
        }catch (e) {
            res.status(500).end(e.message)
        }
        return res
    }

    static async createChat(req, res) {
        try{
            const users_id = req.body
            const {_id} = jwt.decode(req.headers['refresh-token'])
            const chat = await chatService.create(_id, users_id)
            return res.status(200).json(chat)
        }catch (e) {
            res.status(500).end(e.message)
        }
        return res
    }
}