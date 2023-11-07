import Joi from 'joi';

const addOneCarSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .allow(null)
        .optional(),

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
        .max(50)
        .required(),

        hasFuelCard: Joi.boolean()
        .required(),

        fuelCardPIN: Joi.string()
        .pattern(/^(\d{4}|\d{6})$/)
        .allow(null)
        .optional(),

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
        .valid('available', 'notAvailable', 'rented', 'onService', 'damaged', 'banned')
        .required(),

        availabilityDescription: Joi.string()
        .min(1)
        .max(1000)
        .allow(null)
        .optional(),
})

export { addOneCarSchema };
