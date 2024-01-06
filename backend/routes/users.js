import { Router } from "express";

import UserController from "../controllers/UserController.js";
import {validateTokens} from "../middlewares/validateTokens.js";
import multer from 'multer'
const upload = multer();
const userRouter = Router()

userRouter.get('/:id', validateTokens, UserController.getUser)

userRouter.post('/sign_up', UserController.signUp)
userRouter.post('/sign_in', UserController.signIn)
userRouter.post("/logout", UserController.logOut)
userRouter.post('/set_avatar', upload.single('image'), UserController.setAvatar)

userRouter.put('/update', validateTokens, UserController.updateUser)


export default userRouter
