
import { NextFunction, Request, Response, response } from 'express'

import Reservation from '../models/Reservation';
import Car from '../models/Car';
import User from '../models/User';
import { addOneReservationSchema, dateOnlyValidator, filtersObjReservationSchema } from '../models/validation/ReservationSchemas';
import { getNextTwoWeeksDatesArr } from '../utilities/functions/getNextTwoWeeksDatesArr';
import identifyUserId from '../utilities/functions/JWT/identifyUserId';
import { getFormattedDate } from '../utilities/functions/getFormattedDate';
import removeEmptyValuesFromObject from '../utilities/functions/removeEmptyValuesFromObject';

export const fetchAllReservationsWithFilters_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.query.filters) {
        res.status(400).json({status: 'fail', data: [{en: `No query param 'filters' passed.`, pl: `Nie przekazano 'filters' w parametrach zapytania.`}]})
        return;
    }
    if(!req.query.pagenumber || isNaN(Number(req.query.pagenumber))) {
        res.status(400).json({status: 'fail', data: [{en: `No query param 'pagenumber' passed or it is not a number.`, pl: `Nie przekazano 'pagenumber' w parametrach zapytania lub nie jest to cyfra.`}]})
        return;
    }
    if(!req.query.pagesize || isNaN(Number(req.query.pagesize))) {
        res.status(400).json({status: 'fail', data: [{en: `No query param 'pagesize' passed or it is not a number.`, pl: `Nie przekazano 'pagesize' w parametrach zapytania lub nie jest to cyfra.`}]})
        return;
    }

    let sortFromOldest = false;
    if(req.query.sortfromoldest && req.query.sortfromoldest === 'true') {sortFromOldest = true}

        try {
            const pageNumber = Number(req.query.pagenumber);
            const pageSize = Number(req.query.pagesize);

            const receivedQueryString = req.query.filters.toString();
            let filtersObj = JSON.parse(receivedQueryString);
            filtersObj = removeEmptyValuesFromObject(filtersObj)
            await filtersObjReservationSchema.validateAsync(filtersObj)
            const response = await Reservation.fetchAllReservationsWithFilters(filtersObj, pageSize, pageNumber, sortFromOldest)
            res.status(200).json({status: 'success', data: response.records, pagination: response.pagination})
        }
        catch(e) {
            console.log(e);
            res.status(500).json({status: 'error', message: e})
        }
}


export const addOneReservation_POST_user = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    if (!data.carID || isNaN(Number(data.carID))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
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
    const isCarExist = await Car.fetchOne(Number(data.carID), false)
    const {id: userID} = await identifyUserId(req.cookies.jwt);
    const isUserExist = await User.fetchOne(userID, false)
        if(isCarExist && isUserExist) {
            const newReservation = new Reservation(null, data.carID, userID, data.lastEditedByModeratorOfID, data.dateFrom, data.dateTo, data.travelDestination);
            
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
                res.status(400).json({status: 'fail', data: [{en: `The car of id: ${Number(data.carID)} does not exist in the database.`, pl: `Samochód o ID: ${Number(data.carID)} nie istnieje w bazie danych.`}]})
            }
            else if (!isUserExist) {
                res.status(400).json({status: 'fail', data: [{en: `The user of id: ${userID} does not exist in the database.`, pl: `Użytkownik o ID: ${userID} nie istnieje w bazie danych.`}]})
            }
        }
    }
    catch (err) {
        res.status(500).json({status: 'error', message: err})
    }
}


export const deleteOneReservation_DELETE_user = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    if (!data.reservationID || isNaN(Number(data.reservationID))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong reservation ID.', pl: 'Podano złe ID rezerwacji.'}]})
        return;
    }

    try {
        const isReservationExist = await Reservation.fetchOne(Number(data.reservationID))
        const {id: userID, role: userRole} = await identifyUserId(req.cookies.jwt);
        const isUserExist = await User.fetchOne(userID, false)

        if(!isReservationExist) {
            res.status(400).json({status: 'fail', data: [{en: `The reservation of id: ${Number(data.reservationID)} does not exist in the database.`, pl: `Rezerwacja o ID: ${Number(data.reservationID)} nie istnieje w bazie danych.`}]})
            return;
        }
        if(!isUserExist) {
            res.status(400).json({status: 'fail', data: [{en: `The user of id: ${userID} does not exist in the database.`, pl: `Użytkownik o ID: ${userID} nie istnieje w bazie danych.`}]})
            return;
        }
        if(isReservationExist.dataValues.userID !== userID && userRole !== 'admin') { //admin can delete all reservations
            res.status(400).json({status: 'fail', data: [{en: `You cannot delete a reservation that does not belong to you`, pl: `Nie możesz usunąć rezerwacji, która nie należy do Ciebie.`}]})
            return; 
        }

        const dateToday = new Date(getFormattedDate(new Date())) //date today but in format "2024-02-12T00:00:00.000Z". Hours, minutes, seconds set to 0.
        if(isReservationExist.dataValues.dateTo < dateToday) {
            res.status(400).json({status: 'fail', data: [{en: `You cannot delete past reservations. Only administrator has permissions to do it.`, pl: `Nie możesz usuwać przeszłych rezerwacji. Tylko administrator może to zrobić.`}]})
            return; 
        }

        const result = await Reservation.deleteReservation(Number(data.reservationID));
        res.status(200).json({status: 'success', data: result})
            
    }
    catch (err) {
        res.status(500).json({status: 'error', message: err})
    }
}


export const checkReservationsForOneCarForTheNextTwoWeeks_GET_user = async (req: Request, res: Response, next: NextFunction) => {

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
    
        const isCarExist = await Car.fetchOne(Number(req.params.carid), false)
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
                    
                        const userData = await User.fetchOne(oneDayObject.userID!, true)
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


export const checkReservationsForAllCarsForTheNextTwoWeeks_GET_user = async (req: Request, res: Response, next: NextFunction) => {

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
        
        const allCarsBasicData = await Car.fetchAllBasicData(false);
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
                        
                            const userData = await User.fetchOne(oneDayObject.userID!, true)
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

export const findAllReservationsOfUser_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.params.userid || isNaN(Number(req.params.userid))) {
            res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
            return;
        }
        
        if(!req.query.time || (req.query.time !== 'past' && req.query.time !== 'future' && req.query.time !== 'all')) {
            res.status(400).json({status: 'fail', data: [{en: `You have passed a wrong 'time' parameter in URL. It should be 'past', 'future' or 'all'.`, pl: `Podano złą wartość parametru 'time' w URL. Dostępne wartości to: 'past', 'future' lub 'all.`}]})
            return;
        }

        const isUserExist = await User.fetchOne(Number(req.params.userid), true)
        if(isUserExist) {
            //TODO: PAGINATION
            const reservations = await Reservation.fetchAllReservationsOfUser(Number(req.params.userid), req.query.time);
            const allCars = await Car.fetchAllBasicData(true);
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

export const findAllReservationsOfCar_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.params.carid || isNaN(Number(req.params.carid))) {
            res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
            return;
        }
        if(!req.query.time || (req.query.time !== 'past' && req.query.time !== 'future' && req.query.time !== 'all')) {
            res.status(400).json({status: 'fail', data: [{en: `You have passed a wrong 'time' parameter in URL. It should be 'past', 'future' or 'all'.`, pl: `Podano złą wartość parametru 'time' w URL. Dostępne wartości to: 'past', 'future' lub 'all.`}]})
            return;
        }

        const carData = await Car.fetchOneBasicData(Number(req.params.carid), false)
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