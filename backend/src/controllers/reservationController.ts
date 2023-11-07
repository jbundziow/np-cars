
import { NextFunction, Request, Response, response } from 'express'

import Reservation from '../models/Reservation';
import Car from '../models/Car';
import User from '../models/User';
import { addOneReservationSchema, dateOnlyValidator } from '../models/validation/ReservationSchemas';
import { getNextTwoWeeksDatesArr } from '../utilities/functions/getNextTwoWeeksDatesArr';




export const addOneReservation = async (req: Request, res: Response, next: NextFunction) => {
    //TODO: ONLY LOGGED USER CAN ADD RESERVATION!!!
    const data = req.body;
    if (!data.carID || isNaN(Number(data.carID))) {
        res.status(400).json({status: 'fail', data: [`You have passed a wrong carID.`]});
        return;
    }
    else if (!data.userID || isNaN(Number(data.userID))) {
        res.status(400).json({status: 'fail', data: [`You have passed a wrong userID.`]});
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

            const isReservationAlreadyExist = await Reservation.checkReservationsBetweenDates(data.carID, new Date(data.dateFrom), new Date(data.dateTo));
            if (isReservationAlreadyExist && isReservationAlreadyExist.length > 0) {
                res.status(400).json({status: 'fail', data: [`Reservation for that car is already exist in that period.`]})
                return;
            }

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



export const checkReservationsForOneCarForTheNextTwoWeeks = async (req: Request, res: Response, next: NextFunction) => {

    interface responseObject {
        dates: string[],
        reservations: boolean[],
        usersIDs: (number | null)[],
        userNames: (string | null)[]
    }
    let responseObj: responseObject = {
        dates: [],
        reservations: [],
        usersIDs: [],
        userNames: [],
    }

    const data = req.body;
    try {
        if(!req.params.carid || isNaN(Number(req.params.carid))) {
            res.status(400).json({status: 'fail', data: [`You have passed a wrong carID.`]});
            return;
        }
    
        const isCarExist = await Car.fetchOne(Number(req.params.carid))
        if (isCarExist) {
            const nextTwoWeeks: string[] = getNextTwoWeeksDatesArr();

            for await (const date of nextTwoWeeks) {
                const reservation = await Reservation.checkReservationAtDesiredDay(Number(req.params.carid), new Date(date));
                if(reservation) {
                    responseObj.reservations.push(true);
                    responseObj.usersIDs.push(reservation.dataValues.userID);
                }
                else {
                    responseObj.reservations.push(false);
                    responseObj.usersIDs.push(null);
                }
                responseObj.dates.push(date);
            }

            for await (const userID of responseObj.usersIDs) {
                if(userID !== null) {
                const user = await User.fetchOne(userID)
                if(user) {
                    responseObj.userNames.push(`${user.dataValues.name} ${user.dataValues.surname}`);
                }
                else {
                    responseObj.userNames.push('Użytkownik nieznaleziony');
                }
                }
                else {
                    responseObj.userNames.push(null);
                }
            }

            res.status(200).json({status: 'success', data: responseObj})
        }
        else {
            res.status(400).json({status: 'fail', data: [`The car of id: ${req.params.carid} does not exist in the database.`]})
        }
    }
    catch (err) {
        res.status(500).json({status: 'error', message: err})
    }
}


export const checkReservationsForAllCarsForTheNextTwoWeeks = async (req: Request, res: Response, next: NextFunction) => {

}