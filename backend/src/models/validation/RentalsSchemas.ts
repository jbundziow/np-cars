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
        .min(0)
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

    placeID: Joi.number()
        .valid(null),

    dateFrom: Joi.date()
        .required(),

    dateTo: Joi.date()
        .valid(null)
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
        .min(0)
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


const filtersObjRentalSchema = Joi.object({
    carIDs: Joi.array()
        .items(Joi.number().positive().integer())
        .optional(),

    userIDs: Joi.array()
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


















const addOneUnfinishedRentalByAdminUserSchema = Joi.object({
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
        .integer()
        .positive()
        .required()
        .allow(null),

    carMileageBefore: Joi.number()
        .integer()
        .min(0)
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

    placeID: Joi.number()
        .integer()
        .positive()
        .required()
        .allow(null),

    dateFrom: Joi.date()
        .required(),

    dateTo: Joi.date()
        .valid(null)
})







const addOneFinishedRentalByAdminUserSchema = Joi.object({
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
        .integer()
        .positive()
        .required(),

    lastEditedByModeratorOfID: Joi.number()
        .integer()
        .positive()
        .required()
        .allow(null),

    carMileageBefore: Joi.number()
        .integer()
        .min(0)
        .max(2000000)
        .required(),

    carMileageAfter: Joi.number()
        .integer()
        .positive()
        .min(Joi.ref('carMileageBefore'))
        .max(2000000)
        .required(),

    distance: Joi.number()
        .integer()
        .min(0)
        .max(Joi.ref('carMileageAfter'))
        .required(),

    travelDestination: Joi.string()
        .min(1)
        .max(70)
        .required()
        .allow(null),

    placeID: Joi.number()
        .integer()
        .positive()
        .required()
        .allow(null),

    dateFrom: Joi.date()
        .required(),

    dateTo: Joi.date()
        .min(Joi.ref('dateFrom'))
        .required(),
})


















const editOneFinishedRentalByAdminUserSchema = Joi.object({
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

    returnUserID: Joi.number()
        .integer()
        .positive()
        .required(),

    lastEditedByModeratorOfID: Joi.number()
        .integer()
        .positive()
        .required()
        .allow(null),

    carMileageBefore: Joi.number()
        .integer()
        .min(0)
        .max(2000000)
        .required(),

    carMileageAfter: Joi.number()
        .integer()
        .positive()
        .min(Joi.ref('carMileageBefore'))
        .max(2000000)
        .required(),

    distance: Joi.number()
        .integer()
        .min(0)
        .max(Joi.ref('carMileageAfter'))
        .required(),
    
    travelDestination: Joi.string()
        .min(1)
        .max(70)
        .required()
        .allow(null),

    placeID: Joi.number()
        .integer()
        .positive()
        .required()
        .allow(null),

    dateFrom: Joi.date()
        .required(),

    dateTo: Joi.date()
        .min(Joi.ref('dateFrom'))
        .required(),
})






export { addOneRentalByNormalUserSchema, returnCarByNormalUserSchema, filtersObjRentalSchema, addOneUnfinishedRentalByAdminUserSchema, addOneFinishedRentalByAdminUserSchema, editOneFinishedRentalByAdminUserSchema};

