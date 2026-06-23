const Category = require("../models/categories");
const {postAddCategory,updateCartService,increaseCartQuantity, decreaseCartQuantity,removeCartService,getCartItem} = require("../service/cart.service");

const addCart = async(req,res) =>{

    const {slug,quantity} = req.body;
    const authUser = req.user.id;
    const result = await postAddCategory(slug,quantity,authUser)

    return res.status(201).json({message:"Product added to cart",data:result})
}

const updateCart = async(req,res) =>{
    const {slug,quantity} = req.body
     const authUser = req.user.id;

     const result = await updateCartService(slug,quantity,authUser)

    return res.status(201).json({message:"update cart",data:result})
}

const increaseCart = async(req,res) =>{
    const {slug} = req.params;
    const {quantity} = req.body;
    const authUser = req.user.id;

    const result = await increaseCartQuantity(slug,quantity,authUser);

    return res.status(201).json({message:"increase cart quantity",data:result})
}


const decreaseCart = async(req,res) =>{
    const {slug} = req.params;
    const {quantity} = req.body;
    const authUser = req.user.id;

    const result = await decreaseCartQuantity(slug,quantity,authUser);

    return res.status(201).json({message:"increase cart quantity",data:result})
}

const removeCart = async(req,res) =>{
    const {slug} = req.params;
      const authUser = req.user.id;
    
      const result = await removeCartService(slug,authUser);

    return res.status(201).json({message:"Remove item from cart",data:result})

}

const getCartData = async(req,res) =>{
    const authUser = req.user.id;

    const result = await getCartItem(authUser)

    return res.status(201).json({message:"get cart Item",data:result}) 
}
module.exports = {addCart,increaseCart,decreaseCart,removeCart,getCartData}