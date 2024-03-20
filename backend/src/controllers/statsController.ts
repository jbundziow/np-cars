import { NextFunction, Request, Response } from 'express'
import Rental from '../models/Rental';
import Reservation from '../models/Reservation';
import Refueling from '../models/Refueling';
import Fault from '../models/Fault';
import User from '../models/User';







export const fetchTotalStatsOfUser_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.userid || isNaN(Number(req.params.userid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
        return;
    }

    try {
        const isUserExist = await User.fetchOne(Number(req.params.userid), true);
        if(!isUserExist) {
            res.status(404).json({status: 'fail', data: [{en: 'User with this ID does not exist.', pl: 'Użytkownik o podanym ID nie istnieje.'}]})
            return;
        }
        const associatedRentals = await Rental.fetchNumberOfRentalsAssociatedWithUser(Number(req.params.userid), false, false);
        const associatedReservations = await Reservation.fetchNumberOfReservationsAssociatedWithUser(Number(req.params.userid), false);
        const associatedRefuelings = await Refueling.fetchNumberOfRefuelingsAssociatedWithUser(Number(req.params.userid), false);
        const associatedFaults = await Fault.fetchNumberOfFaultsAssociatedWithUser(Number(req.params.userid), false);
    
    res.status(200).json({status: 'success', data: {
        userID: Number(req.params.userid),
        total_rentals: associatedRentals,
        total_reservations: associatedReservations,
        total_refuelings: associatedRefuelings,
        total_faults: associatedFaults
    }})
    }
    catch (error) {
        res.status(500).json({status: 'error', data: error})
        return;
    }

}











export const fetchTotalTravelledDistanceByUser_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    if(!req.params.userid || isNaN(Number(req.params.userid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
        return;
    }
    if(!query.year || isNaN(Number(query.year))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong year.', pl: 'Podano zły rok.'}]})
        return;
    }


    try {
        const dbResponse = await Rental.getTotalDistanceForUserByMonthInYear(Number(req.params.userid), Number(query.year));
        res.status(200).json({
            status: 'success',
            data: {
                userid: Number(req.params.userid),
                year: Number(query.year),
                distance: dbResponse,
            }
        })
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({status: 'error', data: error})
        return;
    }

}


