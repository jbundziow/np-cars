
import { NextFunction, Request, Response } from 'express'

import Car from '../models/Car'



export const fetchAllCars = async (req: Request, res: Response, next: NextFunction) => {
    let dbResponse;
    try {
        dbResponse = await Car.fetchAll();
    }
    catch(err) {
        dbResponse = err;
    }

    res.json({results: dbResponse})
}


