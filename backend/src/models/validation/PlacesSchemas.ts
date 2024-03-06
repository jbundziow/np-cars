import Joi from 'joi';








const filtersObjPlacesSchema = Joi.object({

    projectCode: Joi.string()
        .min(1)
        .optional(),

    placeName: Joi.string()
        .min(1)
        .optional(),

    projectName: Joi.string()
        .min(1)
        .optional(),

    status: Joi.string()
        .valid('active', 'closed', 'banned')
        .optional(),
})


export { filtersObjPlacesSchema }