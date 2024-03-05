import Joi from 'joi';


const addOneFaultByUserSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .allow(null)
        .optional(),

    carID: Joi.number()
        .integer()
        .positive()
        .required(),

    userID: Joi.number()
        .integer()
        .positive()
        .required(),

    moderatorID: Joi.number()
        .integer()
        .positive()
        .valid(null)
        .optional(),

    lastChangeAt: Joi.date()
        .iso()
        .valid(null)
        .optional(),

    title: Joi.string()
        .min(1)
        .max(300)
        .required(),

    description: Joi.string()
        .min(1)
        .max(1000)
        .required(),

    status: Joi.string()
        .valid('pending')
        .required(),

    resultDescription: Joi.string()
        .min(1)
        .max(1000)
        .valid(null)
        .optional(),

    repairCost: Joi.number()
        .max(50000)
        .positive()
        .valid(null)
        .optional(),

})




const editOneFaultByAdminSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required(),

    carID: Joi.number()
        .integer()
        .positive()
        .required(),

    userID: Joi.number()
        .integer()
        .positive()
        .required(),

    moderatorID: Joi.number()
        .integer()
        .positive()
        .required(),

    lastChangeAt: Joi.date()
        .iso()
        .required(),

    title: Joi.string()
        .min(1)
        .max(300)
        .required(),

    description: Joi.string()
        .min(1)
        .max(1000)
        .required(),

    status: Joi.string()
        .valid('pending', 'accepted', 'finished', 'cancelled')
        .required(),

    resultDescription: Joi.string()
        .min(1)
        .max(1000)
        .allow(null)
        .optional(),

    repairCost: Joi.number()
        .max(300000)
        .min(0)
        .allow(null)
        .optional(),
})

export { addOneFaultByUserSchema, editOneFaultByAdminSchema };
