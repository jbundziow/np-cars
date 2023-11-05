
import { NextFunction, Request, Response, response } from 'express'

import Car from '../../models/Car'
import { addOneCarSchema } from '../../models/validation/CarSchemas';



export const addOneCar = async (req: Request, res: Response, next: NextFunction) => {
    //TODO: ONLY ADMIN CAN ADD CAR!!!
    const data = req.body;
    try {
    const newCar = new Car(null, data.brand, data.model, data.type, data.imgPath, data.plateNumber, data.hasFuelCard, data.fuelCardPIN, data.fuelType, data.tankCapacity, data.loadCapacity, new Date(data.nextInspectionDate).toISOString(), new Date(data.nextInsuranceDate).toISOString(), data.availabilityStatus, data.availabilityDescription);
    await addOneCarSchema.validateAsync(newCar);
    await newCar.addOneCar();
    res.status(200).json({status: 'success', data: req.body});
    }
    catch (err) {
        res.status(500).json({status: 'error', message: err})
    }
}


