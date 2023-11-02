
import { NextFunction, Request, Response, response } from 'express'

import Car from '../models/Car'



export const fetchAllCars = async (req: Request, res: Response, next: NextFunction) => {
    let dbResponse;
    try {
        if(req.query.basicdata && req.query.basicdata === 'true') {
            dbResponse = await Car.fetchAllBasicData();
        }
        else {
            dbResponse = await Car.fetchAll();
        }
        res.status(200).json({status: 'success', data: dbResponse})
    }
    catch(err) {
        res.status(500).json({status: 'error', message: err})
    }
}


export const fetchOneCar = async (req: Request, res: Response, next: NextFunction) => { 
    let dbResponse;
    try {
        if(req.query.basicdata && req.query.basicdata === 'true') {
            dbResponse = await Car.fetchOneBasicData(Number(req.params.id));
        }
        else {
            dbResponse = await Car.fetchOne(Number(req.params.id)); 
        }
        res.status(200).json({status: 'success', data: dbResponse})
    }
    catch(err) {
        res.status(500).json({status: 'error', message: err})
    }
}

