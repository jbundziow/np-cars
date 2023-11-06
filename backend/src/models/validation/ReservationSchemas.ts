import Joi from 'joi';

const addOneReservationSchema = Joi.object({
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

    lastEditedByModeratorOfID: Joi.number()
        .integer()
        .positive()
        .allow(null)
        .optional(),
        
    dateFrom: Joi.date()
        .min(new Date().setUTCHours(0, 0, 0, 0).valueOf()) //today
        .required(),

    dateTo: Joi.date()
        .min(new Date().setUTCHours(0, 0, 0, 0).valueOf()) //today
        .required(),
    
    travelDestination: Joi.string()
        .min(1)
        .max(70)
        .required(),

})

export { addOneReservationSchema };

