
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
    if (!isNaN(Number(req.params.carid))) {
        try {
            if(req.query.basicdata && req.query.basicdata === 'true') {
                dbResponse = await Car.fetchOneBasicData(Number(req.params.carid));
            }
            else {
                dbResponse = await Car.fetchOne(Number(req.params.carid)); 
            }
            res.status(200).json({status: 'success', data: dbResponse})
        }
        catch(err) {
            res.status(500).json({status: 'error', message: err})
        }
    }
    else {
        res.status(400).json({status: 'fail', data: {en: 'You have passed a wrong car ID.', pl: 'Podano zły ID samochodu.'}});
    }   
}

