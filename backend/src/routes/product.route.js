const express = require("express")
const  router = express.Router()
const {postProduct,getAllProduct,productbySlug,updateProductbySlg,deleteproduct,
  updateProductStatus,getFeaturedProduct,productBySlug} = require("../controllers/product.controller")
const validate = require("../middleware/validation")
const ProductValidation = require("../validation/product")
const auth = require("../middleware/auth")
const authorize = require("../middleware/authorize")
const upload = require("../middleware/multer")


// router.post("/product",auth,authorize("admin","seller"),validate(ProductValidation),upload.array('images'),postProduct)
router.post(
  "/product",
  auth,
  authorize("admin","seller"),
  upload.array("images"),
  validate(ProductValidation),
  postProduct
);

router.get("/product",auth,authorize("admin","seller"),getAllProduct)
router.get("/feature-products",getFeaturedProduct)
router.get("/products/:slug",productBySlug)
router.get("/product/:slug",auth,authorize("admin","seller"),productbySlug)
router.put("/product/:slug",auth,authorize("admin","seller"),upload.array('newImages'),updateProductbySlg)
router.delete("/product/:slug",auth,authorize("admin","seller"),deleteproduct)
router.patch("/product-status/:slug",auth,authorize("admin","seller"),updateProductStatus)
module.exports = router
