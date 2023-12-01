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
        .valid(null)
})





export { addOneRefuelingByNormalUserSchema };

