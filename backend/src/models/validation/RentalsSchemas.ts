import Joi from 'joi';

const addOneRentalByNormalUserSchema = Joi.object({
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

    returnUserID: Joi.number()
        .valid(null),

    lastEditedByModeratorOfID: Joi.number()
        .valid(null),

    carMileageBefore: Joi.number()
        .integer()
        .positive()
        .max(2000000)
        .required(),

    carMileageAfter: Joi.number()
        .valid(null),
    
    travelDestination: Joi.string()
        .min(1)
        .max(70)
        .required()
        .allow(null),

    placeID: Joi.string()
        .valid(null),

    dateTo: Joi.date()
        .valid(null),
})



export { addOneRentalByNormalUserSchema };

