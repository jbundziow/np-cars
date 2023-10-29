
import { NextFunction, Request, Response, response } from 'express'

import Car from '../../models/Car'



export const addOneCar = async (req: Request, res: Response, next: NextFunction) => {
    // TODO: VALIDATE DATA BEFORE ADDING RECORD TO DB
    const data = req.body;
    try {
    const newCar = new Car(data.id, data.brand, data.model, data.type, data.imgPath, data.plateNumber, data.hasFuelCard, data.fuelCardPIN, data.fuelType, data.tankCapacity, data.loadCapacity, new Date(data.nextInspectionDate).toISOString(), new Date(data.nextInsuranceDate).toISOString(), data.availabilityStatus, data.availabilityDescription);
    await newCar.addOneCar();
    res.json({status: 'success', data: req.body});
    }
    catch (err) {
        res.json({status: 'error', message: err})
    }
}


