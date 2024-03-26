import Joi from 'joi';







const AddOnePlaceByAdminSchema = Joi.object({
    id: Joi.number()
        .valid(null)
        .required(),

    projectCode: Joi.string()
        .min(1)
        .max(100)
        .required(),

    placeName: Joi.string()
        .min(1)
        .max(200)
        .required(),

    projectName: Joi.string()
        .min(1)
        .max(300)
        .required(),

    status: Joi.string()
        .valid('active', 'closed', 'banned')
        .required(),
})







const EditOnePlaceByAdminSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required(),

    projectCode: Joi.string()
        .min(1)
        .max(100)
        .required(),

    placeName: Joi.string()
        .min(1)
        .max(200)
        .required(),

    projectName: Joi.string()
        .min(1)
        .max(300)
        .required(),

    status: Joi.string()
        .valid('active', 'closed', 'banned')
        .required(),
})








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


export { AddOnePlaceByAdminSchema, EditOnePlaceByAdminSchema, filtersObjPlacesSchema }