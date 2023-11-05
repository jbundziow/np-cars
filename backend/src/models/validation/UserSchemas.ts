import Joi from 'joi';

const addOneUserSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .allow(null)
        .optional(),

    gender: Joi.string()
        .valid('male', 'female')
        .required(),

    name: Joi.string()
        .min(1)
        .max(50)
        .required(),

    surname: Joi.string()
        .min(1)
        .max(50)
        .required(),
    
    employedAs: Joi.string()
        .min(1)
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