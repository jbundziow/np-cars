
import { NextFunction, Request, Response } from 'express'

import Car from '../models/Car'



export const fetchAllCars = async (req: Request, res: Response, next: NextFunction) => {
    let dbResponse;
    try {
        const newcar = new Car(null,'citroen','c4','passengerCar','1.jpg','DW22212',true,2137,'diesel',60,700,new Date().toISOString(),new Date("2022-12-01").toISOString(),true,'available',null);
        newcar.addOneCar()
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

