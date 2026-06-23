const express = require('express')
const router = express.Router()
const {postpayment,verifyPayment} = require("../controllers/payment.controller")

const auth = require("../middleware/auth")

router.post("/payment/create",auth,postpayment)
router.post(
   "/payment/verify",
   express.raw({ type: "application/json" }),
   verifyPayment
);

module.exports = router