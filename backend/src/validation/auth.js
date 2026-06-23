const Joi = require("joi");

const RegisterSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role_id:Joi.number().integer().required(),
    confirmPassword: Joi.valid(Joi.ref("password")).required()
});

const loginSchema = Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required()
})

module.exports = {RegisterSchema,loginSchema};