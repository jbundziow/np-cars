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

    dateFrom: Joi.date()
        .required(),

    dateTo: Joi.date()
        .valid(null)
})

const addOneNullRentalByNormalUserSchema = Joi.object({
    id: Joi.number()
        .valid(null),

    carID: Joi.number()
        .integer()
        .positive()
        .required(),

    userID: Joi.number()
        .valid(null),

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
        .integer()
        .positive()
        .max(2000000)
        .min(Joi.ref('carMileageBefore'))
        .required(),
    
    travelDestination: Joi.string()
        .valid(null),

    placeID: Joi.string()
        .valid(null),

    dateFrom: Joi.date()
        .required(),

    dateTo: Joi.date()
        .min(Joi.ref('dateFrom'))
        .required(),
})



const returnCarByNormalUserSchema = Joi.object({
    rentalID: Joi.number()
        .integer()
        .positive()
        .required(),

    carID: Joi.number()
        .integer()
        .positive()
        .required(),

    returnUserID: Joi.number()
        .integer()
        .positive()
        .required(),

    carMileageAfter: Joi.number()
        .integer()
        .positive()
        .max(2000000)
        .required(),

    dateTo: Joi.date()
        .required(),

    travelDestination: Joi.string()
        .min(1)
        .max(70)
        .required()
})





export { addOneRentalByNormalUserSchema, returnCarByNormalUserSchema, addOneNullRentalByNormalUserSchema};

