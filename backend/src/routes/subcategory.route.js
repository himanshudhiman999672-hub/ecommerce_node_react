const express = require("express")
const  router = express.Router()
const {postSubCategory,getSubCategories,getSubCategoryById,updateSlugById,deleteSlug}= require("../controllers/subcategory.controller")
const validate = require("../middleware/validation")
const subcategorySchema = require("../validation/subcategory")
const auth = require("../middleware/auth")
const authorize = require("../middleware/authorize")
const upload = require("../middleware/multer")


router.post("/subcategory",auth,authorize("admin"),validate(subcategorySchema),upload.single('image'),postSubCategory);
router.get("/subcategory",auth,authorize("admin"),getSubCategories);
router.get("/subcategory/:slug",auth,authorize("admin"),getSubCategoryById);
router.put("/subcategory/:slug",auth,authorize("admin"),validate(subcategorySchema),upload.single('image'),updateSlugById);
router.delete("/subcategory/:slug",auth,authorize("admin"),deleteSlug);

module.exports = router