import Joi from 'joi';

const addOneRefuelingByNormalUserSchema = Joi.object({
    id: Joi.number()
        .valid(null),

    carID: Joi.number()
        .integer()
        .positive()
        .required(),

    userID: Joi.number()
        .integer()
        .positive()
        .required(),

    lastEditedByModeratorOfID: Joi.number()
        .valid(null),

    carMileage: Joi.number()
        .integer()
        .positive()
        .max(2000000)
        .required(),

    numberOfLiters: Joi.number()
        .positive()
        .max(2500)
        .required(),

    costBrutto: Joi.number()
        .positive()
        .max(30000)
        .optional()
        .allow(null),

    isFuelCardUsed: Joi.boolean()
        .required(),

    isAcknowledgedByModerator: Joi.boolean()
        .valid(false)
        .required(),
})


const updateOneRefuelingByModeratorSchema = Joi.object({
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

    lastEditedByModeratorOfID: Joi.number()
        .integer()
        .positive()
        .required()
        .allow(null),

    carMileage: Joi.number()
        .integer()
        .positive()
        .max(2000000)
        .required(),

    numberOfLiters: Joi.number()
        .positive()
        .max(2500)
        .required(),

    costBrutto: Joi.number()
        .positive()
        .max(30000)
        .required(),

    isFuelCardUsed: Joi.boolean()
        .required(),

    isAcknowledgedByModerator: Joi.boolean()
        .required()
})




const filtersObjRefuelingSchema = Joi.object({
    carIDs: Joi.array()
        .items(Joi.number().positive().integer())
        .optional(),

    userIDs: Joi.array()
        .items(Joi.number().positive().integer())
        .optional(),
    
    refuelingDateRange_from: Joi.date()
        .optional(),

    refuelingDateRange_to: Joi.date()
        .optional(),
    
    carMileage_from: Joi.number()
        .min(0)
        .optional(),

    carMileage_to: Joi.number()
        .min(0)
        .optional(),

    numberOfLiters_from: Joi.number()
        .min(0)
        .optional(),

    numberOfLiters_to: Joi.number()
        .min(0)
        .optional(),

    averageConsumption_from: Joi.number()
        .min(0)
        .optional(),

    averageConsumption_to: Joi.number()
        .min(0)
        .optional(),

    costBrutto_from: Joi.number()
        .min(0)
        .optional(),

    costBrutto_to: Joi.number()
        .min(0)
        .optional(),

    costPerLiter_from: Joi.number()
        .min(0)
        .optional(),

    costPerLiter_to: Joi.number()
        .min(0)
        .optional(),

    isFuelCardUsed: Joi.boolean()
        .optional(),

    moneyReturned: Joi.boolean()
        .optional(),

    invoiceNumber: Joi.string()
        .min(1)
        .optional(),

    isAcknowledgedByModerator: Joi.boolean()
        .optional(),

    isAcknowledgedByModeratorIDs: Joi.array()
        .items(Joi.number().positive().integer())
        .optional(),

    lastEditedByModerator: Joi.boolean()
        .optional(),

    lastEditedByModeratorIDs: Joi.array()
        .items(Joi.number().positive().integer())
        .optional(),

});




export { addOneRefuelingByNormalUserSchema, updateOneRefuelingByModeratorSchema, filtersObjRefuelingSchema };

