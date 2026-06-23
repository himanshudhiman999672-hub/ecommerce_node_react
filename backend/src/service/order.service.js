const sequelize = require("../config/db")

const Address = require("../models/Address")
const Order = require("../models/Order")
const OrderItem = require("../models/OrderItem")
const Cart = require("../models/cart")
const Coupon = require("../models/coupon")
const CouponUsage = require("../models/couponUsage")
const Product = require("../models/product")

const postOrderService = async (authUserId, data) => {

    const transaction = await sequelize.transaction()

    try {

        // CHECK CART
        const checkCart = await Cart.findAll({
            where: {
                user_id: authUserId
            },
            raw: true,
            transaction
        })

        if (checkCart.length === 0) {
            throw new Error("Cart is empty")
        }

        // CHECK ADDRESS
        const checkAddress = await Address.findOne({
            where: {
                id: data.address_id,
                user_id: authUserId
            },
            transaction
        })

        if (!checkAddress) {
            throw new Error("Address not found")
        }

        // VALID PAYMENT METHODS
        const validPaymentMethods = [
            "COD",
            "razor_pay",
            "stripe"
        ]

        if (!validPaymentMethods.includes(data.payment_method)) {
            throw new Error("Invalid payment method")
        }

        // STOCK VALIDATION
        for (const item of checkCart) {

            const product = await Product.findOne({
                where: {
                    id: item.product_id
                },
                transaction
            })

            if (!product) {
                throw new Error("Product not found")
            }

            if (product.stock < item.quantity) {
                throw new Error(
                    `${product.name} is out of stock`
                )
            }
        }

        // TOTAL AMOUNT
        const totalAmount = checkCart.reduce((acc, item) => {
            return acc + item.total
        }, 0)

        let finalAmount = totalAmount
        let discountAmount = 0
        let couponId = null

        // APPLY COUPON
        if (data.coupon_code) {

            const checkCoupon = await Coupon.findOne({
                where: {
                    coupon_code: data.coupon_code,
                    is_delete: 0
                },
                transaction
            })

            if (!checkCoupon) {
                throw new Error("Coupon not found")
            }

            // CHECK COUPON ALREADY USED
            const checkCouponUsage =
                await CouponUsage.findOne({
                    where: {
                        user_id: authUserId,
                        coupon_id: checkCoupon.id
                    },
                    transaction
                })

            if (checkCouponUsage) {
                throw new Error(
                    "Coupon already used"
                )
            }

            // CURRENT DATE
            const currentDate = new Date()

            // START DATE CHECK
            const startDate =
                new Date(checkCoupon.start_date)

            if (currentDate < startDate) {
                throw new Error(
                    "Coupon not started yet"
                )
            }

            // EXPIRY CHECK
            const expiryDate =
                new Date(checkCoupon.expiry_date)

            if (currentDate > expiryDate) {
                throw new Error("Coupon expired")
            }

            // MINIMUM ORDER CHECK
            if (
                totalAmount <
                checkCoupon.minimum_order_amount
            ) {
                throw new Error(
                    `Minimum order amount should be ${checkCoupon.minimum_order_amount}`
                )
            }

            // USAGE LIMIT CHECK
            if (
                checkCoupon.used_count >=
                checkCoupon.usage_limit
            ) {
                throw new Error(
                    "Coupon usage limit exceeded"
                )
            }

            // PERCENTAGE DISCOUNT
            if (
                checkCoupon.discount_type ===
                "percentage"
            ) {

                discountAmount =
                    (totalAmount *
                        checkCoupon.discount_value) / 100

                // MAXIMUM DISCOUNT CHECK
                if (
                    checkCoupon.maximum_discount_amount &&
                    discountAmount >
                    checkCoupon.maximum_discount_amount
                ) {
                    discountAmount =
                        checkCoupon.maximum_discount_amount
                }
            }

            // FIXED DISCOUNT
            if (
                checkCoupon.discount_type ===
                "fixed"
            ) {

                discountAmount =
                    checkCoupon.discount_value
            }

            finalAmount =
                totalAmount - discountAmount

            // FINAL AMOUNT SAFETY
            if (finalAmount < 0) {
                finalAmount = 0
            }

            couponId = checkCoupon.id

            // UPDATE USED COUNT
            await Coupon.update(
                {
                    used_count:
                        checkCoupon.used_count + 1
                },
                {
                    where: {
                        id: checkCoupon.id
                    },
                    transaction
                }
            )

            // SAVE COUPON USAGE
            await CouponUsage.create({
                user_id: authUserId,
                coupon_id: checkCoupon.id
            }, {
                transaction
            })
        }

        // CREATE ORDER
        const orderData = await Order.create({
            user_id: authUserId,
            address_id: data.address_id,
            coupon_id: couponId,
            total_price: totalAmount,
            discount_amount: discountAmount,
            final_amount: finalAmount,
            order_status: "pending",
            payment_status:
                data.payment_method === "pending"
                    ? "paid"
                    : "failed",
            payment_method: data.payment_method
        }, {
            transaction
        })

        // CREATE ORDER ITEMS
        for (const item of checkCart) {

            const product = await Product.findOne({
                where: {
                    id: item.product_id
                },
                transaction
            })

            // CREATE ORDER ITEM
            await OrderItem.create({
                order_id: orderData.id,
                product_id: item.product_id,
                seller_id: item.seller_id,
                quantity: item.quantity,
                price: item.price
            }, {
                transaction
            })

            // UPDATE STOCK
            await Product.update(
                {
                    stock:
                        product.stock - item.quantity
                },
                {
                    where: {
                        id: item.product_id
                    },
                    transaction
                }
            )
        }

        // CLEAR CART
        await Cart.destroy({
            where: {
                user_id: authUserId
            },
            transaction
        })

        await transaction.commit()

        return orderData

    } catch (error) {

        await transaction.rollback()

        throw error
    }
}


const getOrderService = async (authUserId) => {
    const result = Order.findAll({
        where: { user_id: authUserId }, include: [
            {
                model: OrderItem,
                include: [Product]
            }, {
                model: Address
            }
        ]
    }
    )

    return result
}


const getOrderByIDService = async (id, authUserId) => {

    const result = await Order.findOne({
        where: { id: id, user_id: authUserId }, include: [{


            model: OrderItem,
            include: [Product]
        }, {
            model: Address
        }
        ]

    })

    return result

}



const cancelOrderService = async (authUserId, id) => {
    const result = await Order.update({
        order_status: "cancelled"
    }, {
        where:
        {
            id: id,
            user_id: authUserId
        }
    })
    const data = await Order.findOne({ id: id, user_id: authUserId })
    return data
}


///sellerOrderRoutes
const orderSellerService = async (authUserId) => {

   
    const sellerOrder = await OrderItem.findAll({
        where: { seller_id: authUserId }, include: [
            {
                model: Order,
                include: [Address]
            }, {
                model: Product

            }
        ]
    });


    return sellerOrder
}

const getSingleOrder = async (authUserId, id) => {

    console.log("auth", authUserId, id)
    const result = await OrderItem.findAll({
        where: {
            seller_id: authUserId,
            order_id: id
        }, include: [
            {
                model: Order,
                include: [Address]
            }, {
                model: Product
            }
        ]
    })

    return result
}

const updateSeller = async (id, authUserId, order_status) => {
    const orderId = Number(id);
    const sellerId = String(authUserId);

    const sellerOrderItem = await OrderItem.findOne({
        where: {
            order_id: orderId,
            seller_id: sellerId
        }
    });

    if (!sellerOrderItem) {
        throw new Error("You are not allowed to update this order");
    }

    const [updatedRows] = await Order.update(
        { order_status },
        {
            where: {
                id: orderId
            }
        }
    );

    if (updatedRows === 0) {
        throw new Error("Order not found");
    }

    const updatedOrder = await Order.findOne({
        where: {
            id: orderId
        }
    });

    return updatedOrder;
};

//adminRoute 

const getOrdersAllService = async (req, res) => {
    const result = await Order.findAll({
        order: [["createdAt", "DESC"]],
        include: [{
            model: OrderItem,
            include: [Product]
        }, {
            model: Address
        }]
    },

    )

    return result
}

const getOrderByAdminIdService = async (id) => {
    const result = await Order.findOne({
        where: { id: id }, include: [
            {
                model: OrderItem,
                include: [Product]
            }, {
                model: Address
            }
        ]
    });

    return result
}


const updateOrderByAdminService = async (id, order_status) => {

    await Order.update(
        {
            order_status: order_status
        },
        {
            where: {
                id: id
            }
        }
    );

    const result = await Order.findOne({ where: { id: id } })

    return result;
}


//////
const buyAgainService = async (id, authUserId) => {

    const checkOrder = await Order.findOne({
        where: {
            id: id,
            user_id: authUserId
        },

        include: [
            {
                model: OrderItem
            }
        ]
    });

    if (!checkOrder) {
        throw new Error("Order not found");
    }

    for (const item of checkOrder.order_items) {

        const existingCart = await Cart.findOne({
            where: {
                user_id: authUserId,
                product_id: item.product_id
            }
        });

        if (existingCart) {
            const tquantity = existingCart.quantity + item.quantity
            console.log("tqunatity", tquantity)
            await Cart.update(
                {
                    quantity: tquantity,
                    total: tquantity * item.price
                },
                {
                    where: {
                        id: existingCart.id
                    }
                }
            );

        } else {

            await Cart.create({
                user_id: authUserId,
                product_id: item.product_id,
                quantity: item.quantity,
                seller_id: item.seller_id,
                price: item.price,
                total: item.quantity * item.price
            });
        }
    }

    return checkOrder;
}





module.exports = {
    postOrderService, getOrderService, getOrderByIDService, cancelOrderService, orderSellerService
    , getSingleOrder, updateSeller, getOrdersAllService, getOrderByAdminIdService, updateOrderByAdminService, buyAgainService
}
