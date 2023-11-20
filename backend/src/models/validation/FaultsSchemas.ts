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
        .max(100)
        .required(),
    description: Joi.string()
        .min(1)
        .max(300)
        .required(),
    status: Joi.string()
        .valid('pending', 'accepted', 'finished', 'cancelled')
        .required(),
    resultDescription: Joi.string()
        .min(1)
        .max(300)
        .allow(null)
        .optional(),
    repairCost: Joi.number()
        .max(50000)
        .positive()
        .allow(null)
        .optional(),
})

export { addOneFaultByUserSchema };
