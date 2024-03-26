import Joi from 'joi';







const addOneReservationByNormalUserSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .valid(null)
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
        .min(Joi.ref('dateFrom'))
        .required(),
    
    travelDestination: Joi.string()
        .min(1)
        .max(70)
        .required(),

})






const addOneReservationByAdminUserSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .valid(null)
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
        .required(),
        
    dateFrom: Joi.date()
        .min(new Date().setUTCHours(0, 0, 0, 0).valueOf()) //today
        .required(),

    dateTo: Joi.date()
        .min(Joi.ref('dateFrom'))
        .required(),
    
    travelDestination: Joi.string()
        .min(1)
        .max(70)
        .required(),

})






const editOneReservationByAdminUserSchema = Joi.object({
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
        .required(),
        
    dateFrom: Joi.date()
        .required(),

    dateTo: Joi.date()
        .min(Joi.ref('dateFrom'))
        .required(),
    
    travelDestination: Joi.string()
        .min(1)
        .max(70)
        .required(),
})








//checks if string is in format 'YYYY-MM-DD'
const dateOnlyValidator = (date: string) :boolean => {
    const regex = new RegExp(/^(\d{4})-(\d{2})-(\d{2})$/);
    const result = regex.test(date)
    return result;
}










const filtersObjReservationSchema = Joi.object({
    carIDs: Joi.array()
        .items(Joi.number().positive().integer())
        .optional(),

    userIDs: Joi.array()
        .items(Joi.number().positive().integer())
        .optional(),

    reservationDatesRange_from: Joi.date()
        .optional(),

    reservationDatesRange_to: Joi.date()
        .optional(),

    travelDestination: Joi.string()
        .min(1)
        .optional(),

    wasEditedByModerator: Joi.boolean()
        .optional(),
    
    moderatorIDs: Joi.array()
        .items(Joi.number().positive().integer())
        .optional(),
});


export { addOneReservationByNormalUserSchema, addOneReservationByAdminUserSchema, editOneReservationByAdminUserSchema, dateOnlyValidator, filtersObjReservationSchema };

