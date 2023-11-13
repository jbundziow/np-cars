
import { NextFunction, Request, Response, response } from 'express'

import Refueling from '../models/Refueling';
import Car from '../models/Car';




export const addOneRefueling = async (req: Request, res: Response, next: NextFunction) => {
    // TODO: VALIDATE DATA BEFORE ADDING RECORD TO DB
    //TODO: PASS CORRECT USER ID

    const data = req.body;
    if (!isNaN(Number(req.params.carid))) {
        try {
        const isCarExist = await Car.fetchOne(Number(req.params.carid))
        if(isCarExist) {
            //TODO:fetch last refueling, chceck if new carMileage is greater than old
            //TODO:validate data first, then add to db
            const newRefueling = new Refueling(null, Number(req.params.carid), 1, null, data.carMileage, data.numberOfLiters, data.costBrutto, data.isFuelCardUsed);
            await newRefueling.addOneRefueling();
            res.status(200).json({status: 'success', data: data})
        }
        else {
            res.status(400).json({status: 'fail', data: [{en: `The car of id: ${req.params.carid} does not exist in the database.`, pl: `Samochód o ID: ${req.params.caird} nie istnieje w bazie danych.`}]})
        }
        }
        catch (err) {
            res.status(500).json({status: 'error', message: err})
        }
    }
    else {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
    }
}