const express = require('express')
const router = express.Router()
const {postOrder,getOrder,getOrderById, CancelOrder, sellerOrder, sellerSingleOrderId,
    updateSellerAddress, getOrdersAdmin,getOrderByAdminId,updateOrderStatusAdmin,buyAgain} = require("../controllers/order.controller")
const validate = require("../middleware/validation")
const auth = require("../middleware/auth")
const authorize = require("../middleware/authorize")
const {OrderValidation,orderStatus} = require('../validation/orderValidation')

router.post("/order",auth,validate(OrderValidation),postOrder)
router.get("/order",auth,getOrder)
router.post("/order/:id",auth,getOrderById)
router.post("/order/cancel/:id",auth,CancelOrder)

///sellerOrderRoutes
router.get("/seller/order",auth,authorize("seller"),sellerOrder)
router.get("/seller/order/:id",auth,authorize("seller"),sellerSingleOrderId)
router.patch("/seller/order/:id",auth,authorize("seller"),validate(orderStatus),updateSellerAddress)


//adminOrderROute
router.get("/admin/order",auth,authorize("admin"),getOrdersAdmin)
router.get("/admin/order/:id",auth,authorize("admin"),getOrderByAdminId)
router.patch("/admin/order/:id",auth,authorize("admin"),validate(orderStatus),updateOrderStatusAdmin)

///////////
router.post("/buy-again/:id",auth,buyAgain)



///buyer route 



module.exports = router
