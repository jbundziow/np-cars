
import { NextFunction, Request, Response } from 'express'

import Car from '../models/Car'
import Rental from '../models/Rental';



export const fetchAllCars_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    let alsoBanned = false;
    if(req.query.showbanned && req.query.showbanned === 'true') {
        alsoBanned = true;
    }

    let dbResponse;
    try {
        if(req.query.basicdata && req.query.basicdata === 'true') {
                dbResponse = await Car.fetchAllBasicData(alsoBanned);
        }
        else {
            dbResponse = await Car.fetchAll(alsoBanned);
        }
        res.status(200).json({status: 'success', data: dbResponse})
    }
    catch(err) {
        res.status(500).json({status: 'error', message: err})
    }
}


export const fetchOneCar_GET_user = async (req: Request, res: Response, next: NextFunction) => { 
    let alsoBanned = false;
    if(req.query.showbanned && req.query.showbanned === 'true') {
        alsoBanned = true;
    }

    let dbResponse;
    if (!isNaN(Number(req.params.carid))) {
        try {
            if(req.query.basicdata && req.query.basicdata === 'true') {
                dbResponse = await Car.fetchOneBasicData(Number(req.params.carid), alsoBanned);
            }
            else {
                dbResponse = await Car.fetchOne(Number(req.params.carid), alsoBanned); 
            }

            if(!dbResponse) {
                res.status(400).json({status: 'fail', data: [{en: `Car of ID: ${req.params.carid} does not exist in the database.`, pl: `Samochód o ID: ${req.params.carid} nie istnieje w bazie danych.`}]})
            }
            else {
                res.status(200).json({status: 'success', data: dbResponse})
            }
            
        }
        catch(err) {
            res.status(500).json({status: 'error', message: err})
        }
    }
    else {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano zły ID samochodu.'}]});
    }   
}



export const fetchMileageGaps_GET_user = async (req: Request, res: Response, next: NextFunction) => { 

    try {
        const dbResponse = await Rental.findMileageGaps(35, 36); 
        res.status(200).json({status: 'success', data: dbResponse})
    }
    catch(err) {
        res.status(500).json({status: 'error', message: err})
    }

}