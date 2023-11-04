import Joi from 'joi';

const addOneUserSchema = Joi.object({
    id: Joi.number()
        .integer()
        .allow(null)
        .optional(),

    gender: Joi.string()
        .valid('male', 'female')
        .required(),

    name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),

    surname: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),
    
    employedAs: Joi.string()
        .alphanum()
        .min(2)
        .max(50)
        .required(),
    
    avatarPath: Joi.string()
        .allow(null)
        .optional(),

    role: Joi.string()
        .valid('admin', 'user', 'banned')
        .required(),
})

export { addOneUserSchema };