const express = require("express")
const router = express.Router()
const {postAddress,getAddress,getAddressById,updateAddresById,deleteAddress} = require("../controllers/address.controller")
const auth = require("../middleware/auth")
const validate = require("../middleware/validation")
const addressValidation = require("../validation/addressvalidation")

router.post("/address",auth,validate(addressValidation),postAddress)
router.get("/address",auth,getAddress)
router.get("/address/:id",auth,getAddressById)
router.put("/address/:id",auth,updateAddresById)
router.delete("/address/:id",auth,deleteAddress)





module.exports = router