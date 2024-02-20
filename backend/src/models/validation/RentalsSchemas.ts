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

    distance: Joi.number()
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

    distance: Joi.number()
        .integer()
        .positive()
        .max(10000)
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

    carMileageBefore: Joi.number()
        .integer()
        .positive()
        .max(2000000)
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
        .allow(null)
        .required()
})


const filtersObjSchema = Joi.object({
    carIDs: Joi.array()
        .items(Joi.number().positive().integer())
        .optional(),

    returnUserIDs: Joi.array()
        .items(Joi.number().positive().integer())
        .optional(),

    placeIDs: Joi.array()
        .items(Joi.number().positive().integer())
        .optional(),

    editedByModerator: Joi.boolean()
        .optional(),
    
    carMileageBefore_from: Joi.number()
        .min(0)
        .optional(),

    carMileageBefore_to: Joi.number()
        .min(0)
        .optional(),

    carMileageAfter_from: Joi.number()
        .min(0)
        .optional(),

    carMileageAfter_to: Joi.number()
        .min(0)
        .optional(),

    distance_from: Joi.number()
        .min(0)
        .optional(),

    distance_to: Joi.number()
        .min(0)
        .optional(),

    travelDestination: Joi.string()
        .min(1)
        .optional(),

    dateFrom_from: Joi.date()
        .optional(),

    dateFrom_to: Joi.date()
        .optional(),

    dateTo_from: Joi.date()
        .optional(),

    dateTo_to: Joi.date()
        .optional(),
});


export { addOneRentalByNormalUserSchema, returnCarByNormalUserSchema, addOneNullRentalByNormalUserSchema, filtersObjSchema};

