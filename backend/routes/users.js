const { Router } = require("express");
const multer = require('multer')

const UserController = require("../controllers/UserController.js");

const {validateSignUpData, validateSignInData, validateTokens, validateEditProfileData} = require("../middlewares/index.js");

const upload = multer();
const userRouter = Router()

userRouter.get('/:id', validateTokens, UserController.getUser)

userRouter.post('/sign_up', validateSignUpData, UserController.signUp)

userRouter.post('/sign_in', validateSignInData, UserController.signIn)
userRouter.post("/logout", UserController.logOut)
userRouter.post('/set_avatar', upload.single('image'), UserController.setAvatar)

userRouter.put('/update', validateTokens, validateEditProfileData , UserController.updateUser)

module.exports = userRouter
