
import { NextFunction, Request, Response, response } from 'express'

import Refueling from '../models/Refueling';
import Car from '../models/Car';
import User from '../models/User'
import { addOneRefuelingByNormalUserSchema } from '../models/validation/RefuelingSchemas';
import identifyUserId from '../utilities/functions/JWT/identifyUserId';



export const addOneRefueling_POST_user = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    if (!req.params.carid || isNaN(Number(req.params.carid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
        return;
    }

    try {
        const isCarExist = await Car.fetchOne(Number(req.params.carid))
        const {id: userID} = await identifyUserId(req.cookies.jwt);
        const isUserExist = await User.fetchOne(userID)
        if(isCarExist && isUserExist) {
            const newRefueling = new Refueling(null, Number(req.params.carid), userID, null, data.carMileage, data.numberOfLiters, data.costBrutto, data.isFuelCardUsed, false);
            await addOneRefuelingByNormalUserSchema.validateAsync(newRefueling);
            const lastRefueling = await Refueling.fetchLastRefuelingOfCar(Number(req.params.carid));
            if(lastRefueling) {
                if(lastRefueling.dataValues.carMileage >= data.carMileage) {
                    res.status(400).json({status: 'fail', data: [{en: `Entered mileage ${data.carMileage} can not be less than mileage entered while last refueling ${lastRefueling.dataValues.carMileage}.`, pl: `Wpisany przebieg ${data.carMileage} nie może być mniejszy niż przebieg wpisany podczas ostatniego tankowania ${lastRefueling.dataValues.carMileage}.`}]})
                    return;
                }
            }
            await newRefueling.addOneRefueling();
            res.status(200).json({status: 'success', data: data})
            }
        else {
            if(!isCarExist) {
                res.status(400).json({status: 'fail', data: [{en: `The car of id: ${Number(req.params.carid)} does not exist in the database.`, pl: `Samochód o ID: ${Number(req.params.carid)} nie istnieje w bazie danych.`}]})
                return;
            }
            else if (!isUserExist) {
                res.status(400).json({status: 'fail', data: [{en: `The user of id: ${userID} does not exist in the database.`, pl: `Użytkownik o ID: ${userID} nie istnieje w bazie danych.`}]})
                return;
            }
        }
        }
        catch (err) {
            res.status(500).json({status: 'error', message: err})
        }
}