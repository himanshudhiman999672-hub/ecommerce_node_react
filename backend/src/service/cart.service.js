const Cart = require("../models/cart")
const Product = require("../models/product")
const ProductImage = require("../models/productImage")
const User = require("../models/User")

const getQuantity = (quantity) => {
    const parsedQuantity = Number(quantity)

    if (!Number.isInteger(parsedQuantity) || parsedQuantity <= 0) {
        const error = new Error("Quantity must be a positive integer")
        error.statusCode = 400
        throw error
    }

    return parsedQuantity
}

const validateStock = (product, quantity) => {
    if (quantity > product.stock) {
        const error = new Error(
            `Only ${product.stock} ${product.name} item(s) available`
        )
        error.statusCode = 400
        throw error
    }
}

const postAddCategory = async (slug, quantity, authUser) => {
    const product = await Product.findOne({ where: { slug } })

    if (!product) {
        const error = new Error("product not found")
        error.statusCode = 404
        throw error
    }

    const requestedQuantity = getQuantity(quantity)
    const cartData = await Cart.findOne({ where: { product_id: product.id, user_id: authUser } })

    if (cartData) {
        const newQuantity = cartData.quantity + requestedQuantity
        validateStock(product, newQuantity)

        await Cart.update(
            {
                quantity: newQuantity,
                price: product.price,
                total: product.price * newQuantity
            },
            {
                where: {
                    id: cartData.id
                }
            }
        )

        return

    }

    validateStock(product, requestedQuantity)

    const addCart = await Cart.create({
        product_id: product.id,
        user_id: authUser,
        seller_id: product.seller_id,
        quantity: requestedQuantity,
        price: product.price,
        total: product.price * requestedQuantity
    })

    return addCart
}

const updateCartService = async (slug, quantity, authUser) => {
    const Product = await Product.findOne({ where: { slug } })

    const cartData = await Cart.findOne({ where: { product_id: product.id, user_id: authUser } })


    const updateData = {
        quantity: quantity,
        price: asa
    }

    const updateCartData = await Cart.update({})
}

const increaseCartQuantity = async (slug, quantity, authUser) => {
    const product = await Product.findOne({
        where: {
            slug: slug,
            is_deleted: 0
        }
    })

    if (!product) {
        const error = new Error("Product not found")
        error.statusCode = 404
        throw error
    }

    const cart = await Cart.findOne({ where: { product_id: product.id, user_id: authUser } })

    if (cart) {
        const requestedQuantity = getQuantity(quantity)
        const newQuantity = cart.quantity + requestedQuantity
        validateStock(product, newQuantity)

        const resut = await Cart.update(
            {
                quantity: newQuantity,
                price: product.price,
                total: product.price * newQuantity
            },
            {
                where: {
                    id: cart.id
                }
            }
        )
        return resut
    }

    const error = new Error("No item in cart")
    error.statusCode = 404
    throw error
}


const decreaseCartQuantity = async (slug, quantity, authUser) => {
    const product = await Product.findOne({
        where: {
            slug: slug,
            is_deleted: 0
        }
    })

    const cart = await Cart.findOne({ where: { product_id: product.id, user_id: authUser } })



    if (cart) {

        const newQuantity = cart.quantity - quantity

        if (newQuantity <= 0) {

            await Cart.destroy({
                where: {
                    id: cart.id
                }
            })

            return {
                message: "Item removed from cart"
            }
        }

        const resut = await Cart.update(
            {
                quantity: newQuantity,
                price: product.price,
                total: product.price * newQuantity
            },
            {
                where: {
                    id: cart.id
                }
            }
        )
        return resut
    }

}

const removeCartService = async (slug, authUser) => {
    const product = await Product.findOne({
        where: {
            slug: slug,
            is_deleted: 0
        }
    })

    const cart = await Cart.findOne({ where: { product_id: product.id, user_id: authUser } })
    if (!cart) {
        const error = new Error("No item in cart")
        error.status = 404;
        throw error
    }

    if (cart) {
        await Cart.destroy({
            where: {
                id: cart.id
            }
        })

        return {
            message: "Item removed from cart"
        }
    }

    return cart

}

const getCartItem = async (authUser) => {

    const cart = await Cart.findAndCountAll({
        where: {
            user_id: authUser
        },
        include: [
            {
                model: Product,
                include: [
        {
          model: ProductImage,
        },
    ],
            },
            {
                model: User
            },
        ],
    

    });
    const totalValue = 0
const totalPrice = cart.rows.reduce((acc, cur) => {
  return acc + Number(cur.total);
}, 0);  

const paymentShip = 50;

const grandTotalPrice = Number(totalPrice + paymentShip)

console.log("ggrandotalPrice",grandTotalPrice)

   return {
    count: cart.count,
    rows: cart.rows,
    totalPrice,
    grandTotalPrice,
    paymentShip
  };

}
module.exports = { postAddCategory, updateCartService, increaseCartQuantity, decreaseCartQuantity, removeCartService, getCartItem }
