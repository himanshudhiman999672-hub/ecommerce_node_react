const express = require("express")
const router = express.Router()
const {postCouponCode,getByCoupon,getCouponById,updateById,deleteById} = require("../controllers/coupon.controller")
const auth = require("../middleware/auth")
const authorize = require("../middleware/authorize")


router.post("/coupon",auth,authorize("admin"),postCouponCode)
router.get("/coupon",auth,authorize("admin"),getByCoupon)
router.get("/coupon",auth,authorize("admin"),getByCoupon)
router.get("/coupon/:id",auth,authorize("admin"),getCouponById)
router.put("/coupon/:id",auth,authorize("admin"),updateById)
router.delete("/coupon/:id",auth,authorize("admin"),deleteById)




module.exports = router

