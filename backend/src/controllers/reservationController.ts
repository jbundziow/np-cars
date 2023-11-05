
import { NextFunction, Request, Response, response } from 'express'

import Reservation from '../models/Reservation';
import Car from '../models/Car';
import User from '../models/User';




export const addOneReservation = async (req: Request, res: Response, next: NextFunction) => {
    //TODO: ONLY LOGGED USER CAN ADD RESERVATION!!!
    const data = req.body;
    if (!data.carID || isNaN(Number(data.carID))) {
        res.status(400).json({status: 'fail', data: [`You have passed a wrong car ID.`]})
        return;
    }
    else if (!data.userID || isNaN(Number(data.userID))) {
        res.status(400).json({status: 'fail', data: [`You have passed a wrong user ID.`]})
        return;
    }

    try {
    const isCarExist = await Car.fetchOne(Number(data.carID))
    const isUserExist = await User.fetchOne(Number(data.userID))
        if(isCarExist && isUserExist) {
            const newReservation = new Reservation(null, data.carID, data.userID, data.lastEditedByModeratorOfID, data.dateFrom, data.dateTo, data.travelDestination);
            //TODO: VALIDATION!!!
            // await addOneCarSchema.validateAsync(newCar);
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
