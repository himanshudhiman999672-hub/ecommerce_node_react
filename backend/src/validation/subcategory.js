const Joi =require("joi")

const subcategorySchema = Joi.object({
    name:Joi.string().required(),
    description:Joi.string().required(),
    status:Joi.string().optional(),
    category_id:Joi.string().required
})

module.exports = subcategorySchema