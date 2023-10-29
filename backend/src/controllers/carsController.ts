
import { NextFunction, Request, Response, response } from 'express'

import Car from '../models/Car'



export const fetchAllCars = async (req: Request, res: Response, next: NextFunction) => {
    let status = 'success';
    let dbResponse;
    try {
        // const newcar = new Car(null,'citroen','c4','passengerCar','1.jpg','DW22212',true,2137,'diesel',60,700,new Date().toISOString(),new Date("2022-12-01").toISOString(),true,'available',null);
        // newcar.addOneCar()
        if(req.query.basicdata) {
            dbResponse = await Car.fetchAllBasicData();
        }
        else {
            dbResponse = await Car.fetchAll();
        }

        
    }
    catch(err) {
        dbResponse = err;
        status='error';
    }

    res.json({status: status, data: dbResponse})
}


export const fetchOneCar = async (req: Request, res: Response, next: NextFunction) => { 
    let dbResponse;
    let status;
    try {
        if(req.query.basicdata) {
            dbResponse = await Car.fetchOneBasicData(Number(req.params.id));
        }
        else {
            dbResponse = await Car.fetchOne(Number(req.params.id)); 
        }
        status='success'
    }
    catch(err) {
        status ='error'
        dbResponse = err;
    }
    // if(dbResponse.results.length === 1) {
        res.json({status: status, data: dbResponse})
    // }
    // else {
    //     res.json({error: 'car of specified id is not found'})
    // }
    
}

