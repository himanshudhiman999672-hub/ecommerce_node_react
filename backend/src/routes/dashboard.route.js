const express = require("express")
const router = express.Router()
const getData = require("../controllers/dashboard.controller")
const auth = require("../middleware/auth")
const authorize = require("../middleware/authorize")

router.get("/buyer/dashboard",auth,authorize("buyer","admin"),getData)




module.exports = router

