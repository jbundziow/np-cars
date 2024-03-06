import { NextFunction, Request, Response, response } from 'express'
import { dateOnlyValidator, editOneReservationByAdminUserSchema } from '../../models/validation/ReservationSchemas';
import Car from '../../models/Car';
import identifyUserId from '../../utilities/functions/JWT/identifyUserId';
import User from '../../models/User';
import Reservation from '../../models/Reservation';
import { addOneReservationByAdminUserSchema } from '../../models/validation/ReservationSchemas';


export const addOneReservation_POST_admin = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    if (!data.carID || isNaN(Number(data.carID))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
        return;
    }

    if(!data.userID || isNaN(Number(data.userID))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
        return;
    }



    if(!data.dateFrom || !dateOnlyValidator(data.dateFrom)) {
        res.status(400).json({status: 'fail', data: [`You have passed a wrong 'dateFrom' format. It should be 'YYYY-MM-DD'.`]});
        res.status(400).json({status: 'fail', data: [{en: `You have passed a wrong 'dateFrom' format. It should be 'YYYY-MM-DD'.`, pl: `Podano zły format daty w zmiennej 'dateFrom'. Prawidłowy format to 'YYYY-MM-DD'.`}]})
        return;
    }
    if(!data.dateTo || !dateOnlyValidator(data.dateTo)) {
        res.status(400).json({status: 'fail', data: [{en: `You have passed a wrong 'dateTo' format. It should be 'YYYY-MM-DD'.`, pl: `Podano zły format daty w zmiennej 'dateTo'. Prawidłowy format to 'YYYY-MM-DD'.`}]})
        return;
    }

    try {
    const isCarExist = await Car.fetchOne(Number(data.carID), false)
    const {id: adminID} = await identifyUserId(req.cookies.jwt);
    const isUserExist = await User.fetchOne(Number(data.userID), false)

    if(!isCarExist) {
        res.status(400).json({status: 'fail', data: [{en: `The car of id: ${Number(data.carID)} does not exist in the database.`, pl: `Samochód o ID: ${Number(data.carID)} nie istnieje w bazie danych.`}]})
        return;
    }
    if (!isUserExist) {
        res.status(400).json({status: 'fail', data: [{en: `The user of id: ${Number(data.userID)} does not exist in the database.`, pl: `Użytkownik o ID: ${Number(data.userID)} nie istnieje w bazie danych.`}]})
        return;
    }

    if (!Number(data.lastEditedByModeratorOfID) || isNaN(Number(data.lastEditedByModeratorOfID)) || adminID !== Number(data.lastEditedByModeratorOfID)) {
        res.status(400).json({status: 'fail', data: [{en: `The moderator ID (${data.lastEditedByModeratorOfID}) is missing or you are not logged in as a moderator (${adminID}) with the given ID.`, pl: `Brak podanego ID moderatora (${data.lastEditedByModeratorOfID}) lub nie jesteś zalogowany jako moderator (${adminID}) o podanym ID.`}]})
        return;
    }

        
    const newReservation = new Reservation(null, data.carID, data.userID, data.lastEditedByModeratorOfID, data.dateFrom, data.dateTo, data.travelDestination);
    
    await addOneReservationByAdminUserSchema.validateAsync(newReservation);

    const isReservationAlreadyExist = await Reservation.checkReservationsBetweenDatesForCar(data.carID, new Date(data.dateFrom), new Date(data.dateTo));
    if (isReservationAlreadyExist && isReservationAlreadyExist.length > 0) {
        res.status(400).json({status: 'fail', data: [{en: `Reservation for that car is already exist in that period.`, pl: `Rezerwacja dla tego samochodu już istnieje w tym terminie.`}]})
        return;
    }

    await newReservation.addOneReservation()
    res.status(200).json({status: 'success', data: req.body});
         
    }
    catch (err) {
    res.status(500).json({status: 'error', message: err})
    }
}


















export const editOneReservation_PUT_admin = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    if (!req.params.reservationid || isNaN(Number(req.params.reservationid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong reservation ID.', pl: 'Podano złe ID rezerwacji.'}]})
        return;
    }

    if(!data.userID || isNaN(Number(data.userID))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
        return;
    }



    if(!data.dateFrom || !dateOnlyValidator(data.dateFrom)) {
        res.status(400).json({status: 'fail', data: [`You have passed a wrong 'dateFrom' format. It should be 'YYYY-MM-DD'.`]});
        res.status(400).json({status: 'fail', data: [{en: `You have passed a wrong 'dateFrom' format. It should be 'YYYY-MM-DD'.`, pl: `Podano zły format daty w zmiennej 'dateFrom'. Prawidłowy format to 'YYYY-MM-DD'.`}]})
        return;
    }
    if(!data.dateTo || !dateOnlyValidator(data.dateTo)) {
        res.status(400).json({status: 'fail', data: [{en: `You have passed a wrong 'dateTo' format. It should be 'YYYY-MM-DD'.`, pl: `Podano zły format daty w zmiennej 'dateTo'. Prawidłowy format to 'YYYY-MM-DD'.`}]})
        return;
    }

    try {
    
    const {id: adminID} = await identifyUserId(req.cookies.jwt);
    const isUserExist = await User.fetchOne(Number(data.userID), true)
    const isReservationExist = await Reservation.fetchOne(Number(req.params.reservationid))

    if (!isUserExist) {
        res.status(400).json({status: 'fail', data: [{en: `The user of id: ${Number(data.userID)} does not exist in the database.`, pl: `Użytkownik o ID: ${Number(data.userID)} nie istnieje w bazie danych.`}]})
        return;
    }
    if(!isReservationExist) {
        res.status(400).json({status: 'fail', data: [{en: `The reservation of id: ${Number(req.params.reservationid)} does not exist in the database.`, pl: `Rezerwacja o ID: ${Number(req.params.reservationid)} nie istnieje w bazie danych.`}]})
        return;
    }


    const reservationToEdit = new Reservation(isReservationExist.dataValues.id, isReservationExist.dataValues.carID, data.userID, adminID, data.dateFrom, data.dateTo, data.travelDestination);
    await editOneReservationByAdminUserSchema.validateAsync(reservationToEdit);

    const isAnotherReservationAlreadyExistForThatCar = await Reservation.checkReservationsBetweenDatesForCarAndOtherUsers(isReservationExist.dataValues.carID, data.userID, isReservationExist.dataValues.id, new Date(data.dateFrom), new Date(data.dateTo));
    if (isAnotherReservationAlreadyExistForThatCar && isAnotherReservationAlreadyExistForThatCar.length > 0) {
        res.status(400).json({status: 'fail', data: [{en: `Other reservation for that car is already exist in that period.`, pl: `Inna rezerwacja dla tego samochodu już istnieje w tym terminie.`}]})
        return;
    }

    const result = await reservationToEdit.editOneReservation();
    res.status(200).json({status: 'success', data: result});
         
    }
    catch (err) {
        console.log(err);
        res.status(500).json({status: 'error', message: err})
    }
}