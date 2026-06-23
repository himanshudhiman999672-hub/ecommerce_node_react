const Joi = require("joi");

const addressValidation = Joi.object({
    name: Joi.string().required(),
    phone: Joi.number().required(),
    address_line: Joi.string().required(),
    city: Joi.string().required(),
    state:Joi.string().required(),
    pincode: Joi.string().required(),
    address_type:Joi.string().required()
})

module.exports =  addressValidation