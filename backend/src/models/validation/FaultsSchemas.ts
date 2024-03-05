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
        .allow(null)
        .optional(),

    lastChangeAt: Joi.date()
        .iso()
        .allow(null)
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
        .valid('pending', 'accepted', 'finished', 'cancelled')
        .required(),

    resultDescription: Joi.string()
        .min(1)
        .max(1000)
        .allow(null)
        .optional(),

    repairCost: Joi.number()
        .max(50000)
        .positive()
        .allow(null)
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
        .positive()
        .allow(null)
        .optional(),
})

export { addOneFaultByUserSchema, editOneFaultByAdminSchema };
