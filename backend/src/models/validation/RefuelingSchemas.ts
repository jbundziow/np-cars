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

    refuelingDate: Joi.date()
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

    averageConsumption: Joi.number()
        .valid(null),

    costBrutto: Joi.number()
        .positive()
        .max(30000)
        .optional()
        .allow(null),

    costPerLiter: Joi.number()
        .valid(null), 

    isFuelCardUsed: Joi.boolean()
        .required(),

    moneyReturned: Joi.boolean()
        .when('isFuelCardUsed', {
            is: true,
            then: Joi.valid(null),
            otherwise: Joi.boolean().required(),
        }),

    invoiceNumber: Joi.string()
        .valid(null),

    isAcknowledgedByModerator: Joi.boolean()
        .valid(null)
})


const addOneRefuelingByAdminUserSchema = Joi.object({
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

    refuelingDate: Joi.date()
        .required(),

    lastEditedByModeratorOfID: Joi.number()
        .integer()
        .positive()
        .required(),

    carMileage: Joi.number()
        .integer()
        .positive()
        .max(2000000)
        .required(),

    numberOfLiters: Joi.number()
        .positive()
        .max(2500)
        .required(),

    averageConsumption: Joi.number()
        .valid(null),

    costBrutto: Joi.number()
        .positive()
        .max(30000)
        .optional()
        .allow(null),

    costPerLiter: Joi.number()
        .valid(null), 

    isFuelCardUsed: Joi.boolean()
        .required(),

    moneyReturned: Joi.boolean()
        .when('isFuelCardUsed', {
            is: true,
            then: Joi.valid(null),
            otherwise: Joi.boolean().required(),
        }),

    invoiceNumber: Joi.string()
        .min(1)
        .max(50)
        .required()
        .valid(null),

    isAcknowledgedByModerator: Joi.boolean()
        .required()
        .valid(null)
})





const editOneRefuelingByAdminUserSchema = Joi.object({
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

    refuelingDate: Joi.date()
        .required(),

    lastEditedByModeratorOfID: Joi.number()
        .integer()
        .positive()
        .required(),

    carMileage: Joi.number()
        .integer()
        .positive()
        .max(2000000)
        .required(),

    numberOfLiters: Joi.number()
        .positive()
        .max(2500)
        .required(),

    averageConsumption: Joi.number()
        .valid(null),

    costBrutto: Joi.number()
        .positive()
        .max(30000)
        .optional()
        .allow(null),

    costPerLiter: Joi.number()
        .valid(null), 

    isFuelCardUsed: Joi.boolean()
        .required(),

    moneyReturned: Joi.boolean()
        .when('isFuelCardUsed', {
            is: true,
            then: Joi.valid(null),
            otherwise: Joi.boolean().required(),
        }),

    invoiceNumber: Joi.string()
        .min(1)
        .max(50)
        .required()
        .valid(null),

    isAcknowledgedByModerator: Joi.boolean()
        .required()
        .valid(null)
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




export { addOneRefuelingByNormalUserSchema, addOneRefuelingByAdminUserSchema, editOneRefuelingByAdminUserSchema, filtersObjRefuelingSchema };

