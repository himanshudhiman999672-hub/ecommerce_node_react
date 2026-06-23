const Product = require("../models/product");
const {wishlistAdd,removeWishlist, getWishlistData} = require("../service/wishlist.service");

const addToWishlist = async (req, res) => {
    const { slug } = req.params;
    const authUser = req.user.id;
    const result = await wishlistAdd(slug, authUser)
    return res.status(201).json({ message: "Add Data to wishlist", data: result })

}

const removeToWishlist = async(req,res) =>{
    const {slug} = req.params;
    const authUser= req.user.id;

    const result = await removeWishlist(slug,authUser);

    return res.status(201).json({message:"Remmove item from wishlist",data:result})
}


const getWishlist = async(req,res) =>{
    const authUser = req.user.id ;

    const result  = await getWishlistData(authUser);

 return res.status(201).json({message:"Get wishlist",data:result})

}


module.exports = {addToWishlist,removeToWishlist,getWishlist}