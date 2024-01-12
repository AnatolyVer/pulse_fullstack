import { Router } from "express";
import multer from 'multer'

import UserController from "../controllers/UserController.js";

import {validateSignUpData, validateSignInData, validateTokens} from "../middlewares/index.js";


const upload = multer();
const userRouter = Router()

userRouter.get('/:id', validateTokens, UserController.getUser)

userRouter.post('/sign_up', validateSignUpData, UserController.signUp)

userRouter.post('/sign_in', validateSignInData, UserController.signIn)
userRouter.post("/logout", UserController.logOut)
userRouter.post('/set_avatar', upload.single('image'), UserController.setAvatar)

userRouter.put('/update', validateTokens, UserController.updateUser)

export default userRouter
