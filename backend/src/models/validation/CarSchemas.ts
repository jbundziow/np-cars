import Joi from 'joi';

const addOneCarAdminSchema = Joi.object({
    id: Joi.number()
        .valid(null)
        .required(),

    brand: Joi.string()
        .min(1)
        .max(50)
        .required(),

    model: Joi.string()
        .min(1)
        .max(50)
        .required(),

    type: Joi.string()
        .valid('passengerCar', 'bus', 'truck')
        .required(),

    imgPath: Joi.string()
        .min(1)
        .required(),

    plateNumber: Joi.string()
        .min(1)
        .max(20)
        .required(),

    hasFuelCard: Joi.boolean()
        .required(),

    fuelCardPIN: Joi.string()
        .when('hasFuelCard', {
            is: false,
            then: Joi.valid(null),
            otherwise: Joi.string().pattern(/^(\d{4}|\d{6})$/).invalid(null)
        })
        .required(),

    fuelType: Joi.string()
        .valid('diesel', 'petrol')
        .required(),

    tankCapacity: Joi.number()
        .min(10)
        .max(1600)
        .required(),

    loadCapacity: Joi.number()
        .min(100)
        .max(40000)
        .required(),

    nextInspectionDate: Joi.date()
        .iso()
        .required(),

    nextInsuranceDate: Joi.date()
        .iso()
        .required(),

    availabilityStatus: Joi.string()
        .valid('available')
        .required(),

    availabilityDescription: Joi.string()
        .min(1)
        .max(1000)
        .allow(null)
        .optional(),
})







const editOneCarAdminSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required(),

    brand: Joi.string()
        .min(1)
        .max(50)
        .required(),

    model: Joi.string()
        .min(1)
        .max(50)
        .required(),

    type: Joi.string()
        .valid('passengerCar', 'bus', 'truck')
        .required(),

    imgPath: Joi.string()
        .min(1)
        .required(),

    plateNumber: Joi.string()
        .min(1)
        .max(20)
        .required(),

    hasFuelCard: Joi.boolean()
        .required(),

    fuelCardPIN: Joi.string()
        .when('hasFuelCard', {
            is: false,
            then: Joi.valid(null),
            otherwise: Joi.string().pattern(/^(\d{4}|\d{6})$/).invalid(null)
        })
        .required(),

    fuelType: Joi.string()
        .valid('diesel', 'petrol')
        .required(),

    tankCapacity: Joi.number()
        .min(10)
        .max(1600)
        .required(),

    loadCapacity: Joi.number()
        .min(100)
        .max(40000)
        .required(),

    nextInspectionDate: Joi.date()
        .iso()
        .required(),

    nextInsuranceDate: Joi.date()
        .iso()
        .required(),

    availabilityStatus: Joi.string()
        .valid('available', 'notAvailable', 'onService', 'damaged', 'banned') // 'rented' is not allowed here
        .required(),

    availabilityDescription: Joi.string()
        .min(1)
        .max(1000)
        .allow(null)
        .optional(),
})





export { addOneCarAdminSchema, editOneCarAdminSchema };
