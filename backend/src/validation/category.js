const Joi =require("joi")

const categorySchema = Joi.object({
    name:Joi.string().required(),
    description:Joi.string().required(),
    status:Joi.string().optional()
})

module.exports = categorySchema