const OrderItem = require("../models/OrderItem")

const getSellerOrder = async(authUserId)=>{
    const result = await OrderItem.findOne(
        {where:
            {seller_id:authUserId}
        }
    )

    return result
}
module.exports = getSellerOrder