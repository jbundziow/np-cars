
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
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
        return;
    }
    else if (!data.userID || isNaN(Number(data.userID))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
        return;
    }
    else if(!data.dateFrom || !dateOnlyValidator(data.dateFrom)) {
        res.status(400).json({status: 'fail', data: [`You have passed a wrong 'dateFrom' format. It should be 'YYYY-MM-DD'.`]});
        res.status(400).json({status: 'fail', data: [{en: `You have passed a wrong 'dateFrom' format. It should be 'YYYY-MM-DD'.`, pl: `Podano zły format daty w zmiennej 'dateFrom'. Prawidłowy format to 'YYYY-MM-DD'.`}]})
        return;
    }
    else if(!data.dateTo || !dateOnlyValidator(data.dateTo)) {
        res.status(400).json({status: 'fail', data: [{en: `You have passed a wrong 'dateTo' format. It should be 'YYYY-MM-DD'.`, pl: `Podano zły format daty w zmiennej 'dateTo'. Prawidłowy format to 'YYYY-MM-DD'.`}]})
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
                res.status(400).json({status: 'fail', data: [{en: `Reservation for that car is already exist in that period.`, pl: `Rezerwacja dla tego samochodu już istnieje w tym terminie.`}]})
                return;
            }

            await newReservation.addOneReservation()
            res.status(200).json({status: 'success', data: req.body});
            }
        else {
            if(!isCarExist) {
                res.status(400).json({status: 'fail', data: [{en: `The car of id: ${req.params.carID} does not exist in the database.`, pl: `Samochód o ID: ${req.params.carID} nie istnieje w bazie danych.`}]})
            }
            else if (!isUserExist) {
                res.status(400).json({status: 'fail', data: [{en: `The user of id: ${req.params.userID} does not exist in the database.`, pl: `Użytkownik o ID: ${req.params.userID} nie istnieje w bazie danych.`}]})
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
            res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
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
            res.status(400).json({status: 'fail', data: [{en: `The car of id: ${req.params.carid} does not exist in the database.`, pl: `Samochód o ID: ${req.params.carid} nie istnieje w bazie danych.`}]})
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
            res.status(400).json({status: 'fail', data: [{en: `Not found any car in the database.`, pl: `Nie znaleziono żadnego samochodu w bazie danych.`}]})
        }
    }
    catch (err) {
        res.status(500).json({status: 'error', message: err})
    }
}

export const findAllReservationsOfUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.params.userid || isNaN(Number(req.params.userid))) {
            res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
            return;
        }
        
        if(!req.query.time || (req.query.time !== 'past' && req.query.time !== 'future' && req.query.time !== 'all')) {
            res.status(400).json({status: 'fail', data: [{en: `You have passed a wrong 'time' parameter in URL. It should be 'past', 'future' or 'all'.`, pl: `Podano złą wartość parametru 'time' w URL. Dostępne wartości to: 'past', 'future' lub 'all.`}]})
            return;
        }

        const isUserExist = await User.fetchOne(Number(req.params.userid))
        if(isUserExist) {
            //TODO: PAGINATION
            const reservations = await Reservation.fetchAllReservationsOfUser(Number(req.params.userid), req.query.time);
            const allCars = await Car.fetchAllBasicData();
            res.status(200).json({status: 'success', data: {reservations, allCarsData: allCars}});
        }
        else {
            res.status(400).json({status: 'fail', data: [{en: `The user of id: ${req.params.userid} does not exist in the database.`, pl: `Użytkownik o ID: ${req.params.userid} nie istnieje w bazie danych.`}]})
            return;
        }
        
    }
    catch (err) {
        res.status(500).json({status: 'error', message: err})
    }
}

export const findAllReservationsOfCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.params.carid || isNaN(Number(req.params.carid))) {
            res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
            return;
        }
        if(!req.query.time || (req.query.time !== 'past' && req.query.time !== 'future' && req.query.time !== 'all')) {
            res.status(400).json({status: 'fail', data: [{en: `You have passed a wrong 'time' parameter in URL. It should be 'past', 'future' or 'all'.`, pl: `Podano złą wartość parametru 'time' w URL. Dostępne wartości to: 'past', 'future' lub 'all.`}]})
            return;
        }

        const carData = await Car.fetchOneBasicData(Number(req.params.carid))
        if(carData) {
            //TODO: PAGINATION
            
            const dbResponse = await Reservation.fetchAllReservationsOfCar(Number(req.params.carid), req.query.time);
            res.status(200).json({status: 'success', data: {carData, reservations: dbResponse}});
        }
        else {
            res.status(400).json({status: 'fail', data: [{en: `The car of id: ${req.params.carid} does not exist in the database.`, pl: `Samochód o ID: ${req.params.carid} nie istnieje w bazie danych.`}]})
            return;
        }
        
    }
    catch (err) {
        res.status(500).json({status: 'error', message: err})
    }
}