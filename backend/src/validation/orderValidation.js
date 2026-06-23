const Joi =require("joi")

const OrderValidation = Joi.object({
    address_id:Joi.number().required(),
    payment_method :Joi.string().required(),
    coupon_code :Joi.string().optional()

})

const orderStatus = Joi.object({
    order_status : Joi.string().required()
})

module.exports = {OrderValidation,orderStatus}