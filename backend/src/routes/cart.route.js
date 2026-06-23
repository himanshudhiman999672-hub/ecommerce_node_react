const express = require('express')
const router = express.Router()
const auth = require("../middleware/auth")
const {addCart,increaseCart,decreaseCart, removeCart,getCartData} = require("../controllers/cart.controller")



router.post("/cart",auth,addCart)
router.put("/cart/increase/:slug",auth,increaseCart)
router.put("/cart/decrease/:slug",auth,decreaseCart)
router.delete("/cart/remove/:slug",auth,removeCart)
router.get("/cart",auth,getCartData)

module.exports = router