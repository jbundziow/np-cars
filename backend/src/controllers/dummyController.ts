
import { NextFunction, Request, Response } from 'express'

import Car from '../models/Car'



export const dummyFn = async (req: Request, res: Response, next: NextFunction) => {
    const result = await Car.showAllCars();
    res.json({results: result})
    
}


