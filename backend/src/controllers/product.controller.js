const Category = require("../models/categories");
const Product = require("../models/product");
const ProductImage = require("../models/productImage");
const {postProductService,getProduct,productbySlugService,updateProductbySlugService, deleteProductByService,GetFeaturedProduct} = require("../service/product.service");
const { message } = require("../validation/product");

const postProduct = async (req, res) => {
  try {
    console.log("🔥 POST PRODUCT CONTROLLER HIT");
  console.log("BODY:", req.body);
  console.log("FILES:", req.files);

    console.log("REQ BODY:", req.body);

    const categoryId = Number(req.body.category_id);

    if (!req.body.category_id || Number.isNaN(categoryId)) {
      return res.status(400).json({
        message: "Please select valid category"
      });
    }

    const data = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      discount_price: req.body.discount_price,
      stock: req.body.stock,
      featured: req.body.featured,
      category_id: categoryId,
      images: req.files
    };

    const result = await postProductService(data, req.user.id);

    return res.status(201).json({
      message: "Product created successfully",
      data: result
    });

  } catch (error) {
    console.log("PRODUCT CREATE ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};


const getAllProduct = async(req,res) =>{

    const page = req.query.page || 1;
    const limit = 10;
    
    const search = req.query.search;
    const filter = req.query.filter; 
   
    const sellerId = req.user.id;
    const rolename = req.user;
    console.log(rolename)
    const result = await getProduct(page,limit,search,filter,sellerId,rolename);

    return res.status(201).json({message:"Product retrived successfully",data:result})

}


const productbySlug = async(req,res) =>{
    const {slug} = req.params;
    const result = await productbySlugService(slug)

    return res.status(201).json({message:"Product retrived",result})
}

const updateProductbySlg = async(req,res) =>{

    const {slug} = req.params;

    const {name,description,price,discount_price,images,stock,sku,featured,category_id} = req.body;
    
    const newImages = req.files;
    let deleteImageIds = req.body.deleteImageIds;

        if (typeof deleteImageIds === "string") {

            deleteImageIds = deleteImageIds
                .replace("[", "")
                .replace("]", "")
                .split(",")
                .map(id => Number(id.trim()));
        }
    const data ={
        name,description,price,discount_price,images,stock,sku,featured,category_id,newImages,deleteImageIds
    }


    const result = await updateProductbySlugService(data,slug)

    return res.status(201).json({message:"update product by slug",data:result})
}


const deleteproduct = async(req,res) =>{
    
    const {slug} = req.params;

    const result = await deleteProductByService(slug);

    return res.status(201).json({message:"Product deleted successfully",data:result})
}

const updateProductStatus = async (req, res) => {

    const { slug } = req.params;


    const product = await Product.findOne({
        where: { slug }
    });


    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }


    const newStatus = Number(product.status) === 1 ? 0 : 1;

    await product.update({ status: newStatus });

    return res.status(200).json({
        message: "Status toggled successfully",
        data: product
    });
};


const getFeaturedProduct = async(req,res) =>{
  try {
    const result = await GetFeaturedProduct()
    
    return res.status(200).json({message:"Get Featured Product",data:result})
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}

const productBySlug = async(req,res) =>{
  const {slug} = req.params
  const result = await Product.findOne({where:{slug:slug},include:[{
    model:ProductImage
  },{
    model:Category
  }],
  order: [["createdAt", "DESC"]]
})

  return res.status(201).json({message:"Retrived Product By Slug",data:result})
}




module.exports = {postProduct,getAllProduct,productbySlug,
  updateProductbySlg,deleteproduct,updateProductStatus,getFeaturedProduct,productBySlug}
