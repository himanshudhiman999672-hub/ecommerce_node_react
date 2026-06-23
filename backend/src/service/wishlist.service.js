const Product = require("../models/product")
const Wishlist = require("../models/wishlist")
const wishlistAdd = async(slug,authUser) =>{
    const product = await Product.findOne({where:{slug}})

    const checkProduct = await Wishlist.findOne({where:{product_id:product.id,user_id:authUser}})

    if(checkProduct){
        throw new Error("Product Already in wishlist")
    }
    
    const result = await Wishlist.create({
            product_id:product.id,
            user_id:authUser
    })

    return result
}


const removeWishlist = async(slug,authUser) =>{

    const product = await Product.findOne({where:{slug}})
    
    const checkProduct = await Wishlist.findOne({where:{product_id:product.id,user_id:authUser}})

    console.log("prod",checkProduct)
    
        
    const result =  await Wishlist.destroy({
                where: {
                   product_id:product.id,
            user_id:authUser
                }
            })
    return result


}

const getWishlistData = async(authUser)=>{

    const result = await Wishlist.findAll({
        where:{
            user_id:authUser
        },
        include:[
            {
                model:Product
            }
        ]
    })

    return result
}
module.exports = {wishlistAdd,removeWishlist,getWishlistData}