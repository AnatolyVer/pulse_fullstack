import User from '../models/user.js'
import bcrypt from 'bcrypt'
import userDto from "../dto/userDto.js";
import TokenService from "./tokenService.js";
import jwt from "jsonwebtoken";

import {Storage} from '@google-cloud/storage'
import {dirname} from "path";
import path from "path";

const __dirname = dirname(__filename);

const credentialsPath = path.join(__dirname, process.env.PATH_TO_PROD_JSON);
process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;

const storage = new Storage({ projectId: process.env.PROD_PROJECT_ID })
const bucketName = process.env.GOOGLE_BUCKET_NAME
const bucket = storage.bucket(bucketName)

export default class UserService {
    static async createUser(user, res) {
        try{
            const {username, nickname, password, confirm} = user
            const sameUser = await User.findOne({username})
            if (!sameUser){
                if (password !== confirm) {
                    res.status(400).send("Passwords are not same")
                    return
                }
                const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt())
                const user = await User.create({username, nickname, password: hashedPassword})
                const {accessToken, refreshToken} = await TokenService.generateTokens(user)
                user.sessions.push({accessToken, refreshToken})
                await user.save()
                res.setHeader('access-token', accessToken);
                res.setHeader('refresh-token', refreshToken);
                res.status(200).json(user._id)
            }
            else {
                res.status(409).send("User already exists")
            }
        }catch (e) {
            console.error(e)
        }
    }

    static async logUser({username, password}, res) {
        try{
            const sameUser = await User.findOne({username})
            if (sameUser){
                const isPasswordCorrect = await bcrypt.compare(password, sameUser.password)
                if (isPasswordCorrect){
                    const {accessToken, refreshToken} = await TokenService.generateTokens(sameUser)
                    sameUser.sessions.push({accessToken, refreshToken})
                    await sameUser.save()
                    res.setHeader('access-token', accessToken);
                    res.setHeader('refresh-token', refreshToken);
                    res.status(200).json(sameUser._id)
                }
                else {
                    res.status(404).send("Wrong data or user doesn't exist")
                }
            }
            else {
                res.status(404).send("Wrong data or user doesn't exist")
            }
        }catch (e) {
            console.error(e)
        }
    }

    static async getUser(id, res) {
        try{
            const user = await User.findById(id)
            res.status(200).json(new userDto(user))
        }catch (e) {
            console.error(e)
            res.status(404).send("User not found")
        }
    }

    static async logOut(req, res) {
        try{
            const accessToken = req.headers['access-token']
            const refreshToken = req.headers['refresh-token']

            const {_id} = jwt.decode(refreshToken)
            const user = await User.findById(_id)

            const index = user.sessions.findIndex(session => session.accessToken === accessToken && session.refreshToken === refreshToken)

            user.sessions.splice(index, 1);
            await user.save()

            res.status(200).end()
        }catch (e) {
            console.error(e)
            res.status(404).send("User not found")
        }
    }


    static async updateUser(updatedUser, id, res){
        try {
            const user = await User.findById(id)

            const isSameUsername = await User.findOne({username: updatedUser.username})
            if (isSameUsername) return res.status(404).send("Username is already used")

            for (let key in updatedUser) {
                if (key !== 'id') {
                    user[key] = updatedUser[key];
                }
            }
            await user.save()
            res.status(200).send(id)
        }catch (e) {
            console.error(e)
            res.status(404).send("Some issues with updating")
        }
    }

    static async setAvatar(avatar, fileName) {
        try {
            const gcsFile = bucket.file(fileName);

            const stream = gcsFile.createWriteStream({
                metadata: {
                    contentType: avatar.mimetype,
                },
            });

            stream.on('error', (err) => {
                throw new Error('Error uploading file:' + err.message);
            });

            stream.on('finish', async () => {
                console.log('The file has been successfully uploaded to Google Cloud Storage.');
            });
            stream.end(avatar.buffer);
            return await this.getAvatar(gcsFile);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async getAvatar(fileName) {
        try {
            const currentDate = new Date();
            const expiresDate = new Date(currentDate);
            expiresDate.setFullYear(currentDate.getFullYear() + 1);

            const [url] = await fileName.getSignedUrl({
                action: 'read',
                expires: expiresDate.toISOString(),
            });

            return url + `&data=${Date.now()}`;
        } catch (e) {
            throw new Error(e.message);
        }
    }
}