const express = require('express')
const router = express.Router()
const {postCategories,getCategory,getCategoryByslug, updateCategory, deleteCategory,getSubcategoryForAll} = require("../controllers/categories.controller")
const validate = require("../middleware/validation")
const categorySchema = require("../validation/category")
const upload = require("../middleware/multer")
const auth = require("../middleware/auth")
const authorize = require("../middleware/authorize")

router.post("/category",auth,authorize("admin"),upload.single('image'),validate(categorySchema),postCategories)
router.get("/category",auth,authorize("admin"),getCategory)
router.get("/category/:slug",auth,authorize("admin"),getCategoryByslug)
router.put("/category/:slug",auth,authorize("admin"),validate(categorySchema),upload.single('image'),updateCategory)
router.delete("/category/:slug",auth,authorize("admin"),deleteCategory);
router.get("/categories", getSubcategoryForAll)

module.exports = router