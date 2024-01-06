import userService from '../services/UserService.js'
import jwt from "jsonwebtoken";

export default class UserController {

    static async signUp(req, res) {
        try{
            const user = req.body
            await userService.createUser(user, res)
        }catch (e) {
            res.status(500).end()
        }
        return res
    }

    static async signIn(req, res) {
        try{
            const user = req.body
            await userService.logUser(user, res)
        }catch (e) {
            res.status(500).end()
        }
        return res
    }

    static async getUser(req, res) {
        try{
            const {id} = req.params
            await userService.getUser(id, res)
        }catch (e) {
            res.status(500).end()
        }
        return res
    }

    static async logOut(req, res) {
        try{
            await userService.logOut(req, res)
        }catch (e) {
            res.status(500).end()
        }
        return res
    }

    static async updateUser(req, res) {
        try{
            const user = req.body
            const {_id} = jwt.decode(req.headers['refresh-token'])
            await userService.updateUser(user, _id, res)
        }catch (e) {
            res.status(500).end()
        }
        return res
    }

    static async setAvatar(req, res){
        try {
            const avatar = req.file;
            const {username} = jwt.decode(req.headers['access-token'])
            const fileName = [username,'_','avatar'].join();
            const url = await userService.setAvatar(avatar, fileName)
            res.status(200).send(url)
        } catch (err) {
            console.error(err);
            res.status(404).end()
        }
        return res
    }
}