import Joi from 'joi';

const signUpUserSchema = Joi.object({
    id: Joi.number()
        .valid(null),

    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    
    password: Joi.string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) // minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
        .min(8)
        .required(),

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
        .max(80)
        .required(),
    
    avatarPath: Joi.string()
        .allow(null)
        .optional(),

    role: Joi.string()
        .allow(null)
        .optional(),
})




const editOneUserByAdminSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required(),

    email: Joi.string()
        .valid(null),
    
    password: Joi.string()
        .valid(null),

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
        .max(80)
        .required(),
    
    avatarPath: Joi.string()
        .valid(null),

    role: Joi.string()
        .valid('unconfirmed', 'admin', 'user', 'banned')
        .required(),
})



const editOneUserByNormalUserSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required(),

    email: Joi.string()
        .valid(null),
    
    password: Joi.string()
        .valid(null),

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
        .max(80)
        .required(),
    
    avatarPath: Joi.string()
        .valid(null),

    role: Joi.string()
        .valid(null),
})

export { signUpUserSchema, editOneUserByAdminSchema, editOneUserByNormalUserSchema };