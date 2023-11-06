
import { NextFunction, Request, Response, response } from 'express'

import Reservation from '../models/Reservation';
import Car from '../models/Car';
import User from '../models/User';
import { addOneReservationSchema, dateOnlyValidator } from '../models/validation/ReservationSchemas';




export const addOneReservation = async (req: Request, res: Response, next: NextFunction) => {
    //TODO: ONLY LOGGED USER CAN ADD RESERVATION!!!
    const data = req.body;
    if (!data.carID || isNaN(Number(data.carID))) {
        res.status(400).json({status: 'fail', data: [`You have passed a wrong car ID.`]});
        return;
    }
    else if (!data.userID || isNaN(Number(data.userID))) {
        res.status(400).json({status: 'fail', data: [`You have passed a wrong user ID.`]});
        return;
    }
    else if(!data.dateFrom || !dateOnlyValidator(data.dateFrom)) {
        res.status(400).json({status: 'fail', data: [`You have passed a wrong 'dateFrom' format. It should be 'YYYY-MM-DD'.`]});
        return;
    }
    else if(!data.dateTo || !dateOnlyValidator(data.dateTo)) {
        res.status(400).json({status: 'fail', data: [`You have passed a wrong 'dateTo' format. It should be 'YYYY-MM-DD'.`]});
        return;
    }

    try {
    const isCarExist = await Car.fetchOne(Number(data.carID))
    const isUserExist = await User.fetchOne(Number(data.userID))
        if(isCarExist && isUserExist) {
            const newReservation = new Reservation(null, data.carID, data.userID, data.lastEditedByModeratorOfID, data.dateFrom, data.dateTo, data.travelDestination);
            
            await addOneReservationSchema.validateAsync(newReservation);

            //TODO: CHCECK IF RESERVATION IN THAT PERIOD FOR THAT CAR DOES NOT EXIST
            await newReservation.addOneReservation()
            res.status(200).json({status: 'success', data: req.body});
            }
        else {
            if(!isCarExist) {
                res.status(400).json({status: 'fail', data: [`The car of id: ${data.carID} does not exist in the database.`]})
            }
            else if (!isUserExist) {
                res.status(400).json({status: 'fail', data: [`The user of id: ${data.userID} does not exist in the database.`]})
            }
        }
    }
    catch (err) {
        res.status(500).json({status: 'error', message: err})
    }
}



export const test = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await Reservation.test(new Date('2023-11-12'));
        res.status(200).json({status: 'success', data: response});
    }
    catch (err) {
        res.status(500).json({status: 'error', message: err})
    }
}