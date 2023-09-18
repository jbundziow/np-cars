
import { NextFunction, Request, Response } from 'express'

import Car from '../models/Car'



export const dummyFn = async (req: Request, res: Response, next: NextFunction) => {
    const myNewCar = new Car(null,'toyota','avensis','fz23113',false)
    myNewCar.addCar()
    const result = await Car.showAllCars();
    res.json({results: result})
    
}


