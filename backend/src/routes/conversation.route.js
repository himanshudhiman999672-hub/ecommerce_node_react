const express = require('express')
const router = express.Router()
const validate = require("../middleware/validation")
const upload = require("../middleware/multer")
const auth = require("../middleware/auth")
const authorize = require("../middleware/authorize")
const {setOrder,sellerConversation,getMessages,getMessagesByOrderItem} = require('../controllers/conversation.controller')

router.post("/conversation/order/:orderid/item/:orderItemId",auth,authorize("admin","buyer"),setOrder)
router.post("/sellerconversation/order/:orderid/item/:orderItemId",auth,authorize("seller"),sellerConversation)
router.get("/conversation/order/:orderid/item/:orderItemId/messages",auth,getMessagesByOrderItem)
router.get("/conversation/:id/messages",auth,getMessages)

module.exports = router
