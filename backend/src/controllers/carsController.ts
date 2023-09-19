
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


export const fetchOneCar = async (req: Request, res: Response, next: NextFunction) => { 
    let dbResponse;
    try {
        dbResponse = await Car.fetchOne(Number(req.params.id));
    }
    catch(err) {
        dbResponse = err;
    }
    // if(dbResponse.results.length === 1) {
        res.json({results: dbResponse})
    // }
    // else {
    //     res.json({error: 'car of specified id is not found'})
    // }
    
}

