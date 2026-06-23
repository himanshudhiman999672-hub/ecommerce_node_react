const Joi = require("joi")
const ProductValidation = Joi.object({
    name: Joi.string().min(2).required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    discount_price: Joi.number().required(),
    stock: Joi.number().required(),
    featured: Joi.string().required(),
    category_id: Joi.number().required()
})

module.exports = ProductValidation