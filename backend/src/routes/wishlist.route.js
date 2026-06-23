const express = require("express")
const  router = express.Router()

const  {addToWishlist,removeToWishlist,getWishlist} = require("../controllers/wishlist.controller")     

const auth = require("../middleware/auth")

router.post("/wishlist/:slug",auth,addToWishlist)

router.delete("/wishlist/remove/:slug",auth,removeToWishlist)
router.get("/wishlist",auth,getWishlist)


module.exports = router