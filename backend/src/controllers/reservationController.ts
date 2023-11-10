
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

    type oneDayObjectType = {
        date: string,
        reservation: boolean,
        userID: (number | null),
        userName: (string | null)
    }
    let responseObj: oneDayObjectType[] = [];

    try {
        if(!req.params.carid || isNaN(Number(req.params.carid))) {
            res.status(400).json({status: 'fail', data: [`You have passed a wrong carID.`]});
            return;
        }
    
        const isCarExist = await Car.fetchOne(Number(req.params.carid))
        if (isCarExist) {
            const nextTwoWeeks: string[] = getNextTwoWeeksDatesArr();


            
            for await (const date of nextTwoWeeks) {
                let oneDayObject: oneDayObjectType = {
                    date: "",
                    reservation: false,
                    userID: null,
                    userName: null
                };
                const reservation = await Reservation.checkReservationAtDesiredDay(Number(req.params.carid), new Date(date));
                if(reservation) {
                    oneDayObject = {...oneDayObject, reservation: true}
                    oneDayObject = {... oneDayObject, userID: reservation.dataValues.userID}
                    
                        const userData = await User.fetchOne(oneDayObject.userID!)
                        if(userData) {
                            oneDayObject = {...oneDayObject, userName: `${userData.dataValues.name} ${userData.dataValues.surname}`}
                        }
                        else {
                            oneDayObject = {...oneDayObject, userName: 'Użytkownik nieznaleziony'}
                        }
                }
                oneDayObject = {... oneDayObject, date: date}
                responseObj.push(oneDayObject)
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

    type reservationsType = {
        date: string,
        reservation: boolean,
        userID: (number | null),
        userName: (string | null)
    }
    type oneCarObjectType = {
        id: number,
        brand: string,
        model: string,
        imgPath: string,
        availabilityStatus: 'available' | 'notAvailable' | 'rented' | 'onService' | 'damaged' | 'banned',
        reservations: reservationsType[],
    }


    let responseObj: oneCarObjectType[] = [];
    try {
        
        const allCarsBasicData = await Car.fetchAllBasicData();
        if (allCarsBasicData) {

            for await (const carObj of allCarsBasicData) {
                let reservationsArr: reservationsType[] = [];
                const nextTwoWeeks: string[] = getNextTwoWeeksDatesArr();
                for await (const date of nextTwoWeeks) {
                    let oneDayObject: any = {
                        date: "",
                        reservation: false,
                        userID: null,
                        userName: null
                    };
                    const reservation = await Reservation.checkReservationAtDesiredDay(Number(carObj.dataValues.id), new Date(date));
                    if(reservation) {
                        oneDayObject = {...oneDayObject, reservation: true}
                        oneDayObject = {... oneDayObject, userID: reservation.dataValues.userID}
                        
                            const userData = await User.fetchOne(oneDayObject.userID!)
                            if(userData) {
                                oneDayObject = {...oneDayObject, userName: `${userData.dataValues.name} ${userData.dataValues.surname}`}
                            }
                            else {
                                oneDayObject = {...oneDayObject, userName: 'Użytkownik nieznaleziony'}
                            }
                    }
                    oneDayObject = {... oneDayObject, date: date}
                    reservationsArr.push(oneDayObject)
                }
                responseObj.push({...carObj.dataValues, reservations: reservationsArr})
            }
            

            res.status(200).json({status: 'success', data: responseObj})
        }
        else {
            res.status(400).json({status: 'fail', data: [`Not found any car in the database.`]})
        }
    }
    catch (err) {
        res.status(500).json({status: 'error', message: err})
    }
}

//req.query to find past/future/all
//carbasicdata + reservations data to display in table
export const findAllReservationsOfUser = async (req: Request, res: Response, next: NextFunction) => {

}

//req.query to find past/future/all
//carbasicdata + reservations data to display in table
export const findAllReservationsOfCar = async (req: Request, res: Response, next: NextFunction) => {

}