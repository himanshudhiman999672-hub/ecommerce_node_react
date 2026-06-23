const express = require("express")
const  router = express.Router()
const {register,verifyUser,login,refreshToken,getProfile} = require("../controllers/auth.controller")
const validate = require("../middleware/validation")
const {RegisterSchema,loginSchema} = require("../validation/auth")
const auth = require("../middleware/auth")

router.post("/register",validate(RegisterSchema),register)
router.get("/verify", verifyUser);
router.post("/login",validate(loginSchema),login)
router.post("/refresh-token",refreshToken)
router.get("/profile",auth,getProfile)

module.exports = router