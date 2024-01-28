const { Router } = require("express");
const ChatController = require("../controllers/ChatController.js");
const {validateTokens} = require("../middlewares");

const chatRouter = Router()

chatRouter.get('/get_all', validateTokens, ChatController.getAll)

chatRouter.post('/send', validateTokens, ChatController.sendMessage)
chatRouter.post('/create', validateTokens, ChatController.createChat)

chatRouter.get('/:chat_id', validateTokens, ChatController.getOne)


module.exports = chatRouter