const Product = require("../models/product")
const ProductImage = require("../models/productImage")
const { Op } = require("sequelize")
const Category = require("../models/categories")
const postProductService = async (data, userId) => {

    const baseSlug = data.name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
    const existingSlugCount = await Product.count({
        where: {
            slug: {
                [Op.like]: `${baseSlug}%`
            }
        }
    })
    const slugData = existingSlugCount > 0 ? `${baseSlug}-${Date.now()}` : baseSlug

    const skuData = `${slugData}-${Date.now()}`
    console.log("skuData",skuData)

  const product = await Product.create({
  name: data.name,
  slug: slugData,
  description: data.description,
  price: Number(data.price),
  status: 1,
  discount_price: Number(data.discount_price),
  stock: Number(data.stock),
  sku: skuData,
  featured: data.featured === "true" || data.featured === true,
  seller_id: userId,
  category_id: Number(data.category_id)
});
    if (data.images && data.images.length > 0) {

        const imageData = data.images.map((file) => ({
            image: file.filename,
            product_id: product.id
        }))

        await ProductImage.bulkCreate(imageData)
    }

    return product

}

const getProduct = async (page, limit, search, filter, sellerId, rolename) => {

    const currentPage = Number(page) || 1;
    const skip = (page - 1) * limit

    const sellId = sellerId;
    const role = rolename.role;


    let whereCondition = {};

    if (role !== "admin") {
        whereCondition.seller_id = sellerId;
    }


    if (search) {
        whereCondition.name = {
            [Op.like]: `%${search}%`

        };
    }

    let orderCondition = [];

    if (filter == 1) {
        orderCondition = [["createdAt", "DESC"]];
    }
    else if (filter == 2) {
        orderCondition = [["price", "DESC"]];
    }
    else if (filter == 3) {
        orderCondition = [["price", "ASC"]];
    }
    else {
        orderCondition = [["createdAt", "DESC"]];
    }

    const countProducts = await Product.count({
        where: whereCondition
    });


    const product = await Product.findAll({
        where: whereCondition,
        include: [ProductImage],
        order: orderCondition,
        offset: skip,
        limit: limit
    })

    return { product, totalProduct: countProducts, currentPage: page, totalPages: Math.ceil(countProducts / limit) }
}

const productbySlugService = async (slug) => {
    const result = await Product.findOne({ where: { slug },include:{
        model:ProductImage
    } })

    return result;
}

const updateProductbySlugService = async (data, slug) => {

    const updateProduct = await Product.findOne({
        where: { slug }
    });

    if (!updateProduct) {
        const error = new Error("Product not found from this slug");
        error.status = 404;
        throw error;
    }

    await Product.update(
        {
            name: data.name,
            description: data.description,
            price: data.price,
            discount_price: data.discount_price,
            stock: data.stock,
            sku: data.sku,
            featured: data.featured,
            category_id: data.category_id
        },
        {
            where: { slug }
        }
    );

    if (data.deleteImageIds && data.deleteImageIds.length > 0) {

        await ProductImage.destroy({
            where: {
                id: data.deleteImageIds,
                product_id: updateProduct.id
            }
        });
    }

    if (data.newImages && data.newImages.length > 0) {

        const imageData = data.newImages.map((file) => ({
            image: file.filename,
            product_id: updateProduct.id
        }));

        await ProductImage.bulkCreate(imageData);
    }

    const updatedProduct = await Product.findOne({
        where: { slug },
        include: [ProductImage]
    });

    return updatedProduct;
};

const deleteProductByService = async (slug) => {
    
 const product = await Product.findOne({
        where:{ slug }
    })

    if(!product){
        throw new Error("product not found")
    }

    const result = await Product.update({
        is_deleted: 1
    }, { where: { slug } })

    return product
}

const GetFeaturedProduct = async(req,res) =>{
    const result = await Product.findAll({
        where: {
            featured: true,
            is_deleted: false
        },
        include: [{
           model: ProductImage
    },{
        model:Category
    }],
        order: [["createdAt", "DESC"]],
        limit:3
    })

    return result
}

module.exports = {
    postProductService, getProduct, productbySlugService,
    updateProductbySlugService, deleteProductByService,GetFeaturedProduct
}
