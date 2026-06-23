const express = require("express")
const  router = express.Router()
const getUser = require("../controllers/user.controller")
const validate = require("../middleware/validation")
const ProductValidation = require("../validation/product")
const auth = require("../middleware/auth")
const authorize = require("../middleware/authorize")
const upload = require("../middleware/multer")


router.get("/users",auth,authorize("admin"),getUser)

module.exports = router