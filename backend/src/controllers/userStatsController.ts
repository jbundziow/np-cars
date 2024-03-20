import { NextFunction, Request, Response } from 'express'
import Rental, { RentalModel } from '../models/Rental';
import Reservation, { ReservationModel } from '../models/Reservation';
import Refueling, { RefuelingModel } from '../models/Refueling';
import Fault, { FaultModel } from '../models/Fault';
import User from '../models/User';
import getDateRangesForYear from '../utilities/functions/getDateRangesForYear';
import { Op } from 'sequelize';







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
        const total_rentals = await RentalModel.count({where: {userID: Number(req.params.userid), carMileageAfter: {[Op.ne]: null} }});
        const total_reservations = await ReservationModel.count({where: {userID: Number(req.params.userid)}});
        const total_refuelings = await RefuelingModel.count({where: {userID: Number(req.params.userid)}});
        const total_faults = await FaultModel.count({where: {userID: Number(req.params.userid)}});
    
    res.status(200).json({status: 'success', data: {
        userID: Number(req.params.userid),
        total_rentals,
        total_reservations,
        total_refuelings,
        total_faults
    }})
    }
    catch (error) {
        res.status(500).json({status: 'error', data: error})
        return;
    }

}












export const fetchTotalStatsOfUserInYear_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.userid || isNaN(Number(req.params.userid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
        return;
    }
    if(!req.params.year || isNaN(Number(req.params.year))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong year in the URL.', pl: 'Podano zły rok w URL.'}]})
        return;
    }

    try {
        const isUserExist = await User.fetchOne(Number(req.params.userid), true);
        if(!isUserExist) {
            res.status(404).json({status: 'fail', data: [{en: 'User with this ID does not exist.', pl: 'Użytkownik o podanym ID nie istnieje.'}]})
            return;
        }

        const {startDate: currentYear_startDate, endDate: currentYear_endDate} = getDateRangesForYear(Number(req.params.year));
        const {startDate: previousYear_startDate, endDate: previousYear_endDate} = getDateRangesForYear(Number(req.params.year) - 1);



        const total_rentals_currentYear = await RentalModel.count({where: {userID: Number(req.params.userid), dateTo: {[Op.between]: [currentYear_startDate, currentYear_endDate]}} });
        const total_reservations_currentYear = await ReservationModel.count({where: {userID: Number(req.params.userid), dateTo: {[Op.between]: [currentYear_startDate, currentYear_endDate]}} });
        const total_refuelings_currentYear = await RefuelingModel.count({where: {userID: Number(req.params.userid), refuelingDate: {[Op.between]: [currentYear_startDate, currentYear_endDate]}} });
        const total_faults_currentYear = await FaultModel.count({where: {userID: Number(req.params.userid), createdAt: {[Op.between]: [currentYear_startDate, currentYear_endDate]}} });
        const total_distance_currentYear = await RentalModel.sum('distance', {where: {userID: Number(req.params.userid), dateTo: {[Op.between]: [currentYear_startDate, currentYear_endDate]} }}) || 0;
        const total_number_of_refueled_liters_currentYear = await RefuelingModel.sum('numberOfLiters', {where: {userID: Number(req.params.userid), refuelingDate: {[Op.between]: [currentYear_startDate, currentYear_endDate]} }}) || 0;
        const total_costBrutto_of_fuel_currentYear = await RefuelingModel.sum('costBrutto', {where: {userID: Number(req.params.userid), refuelingDate: {[Op.between]: [currentYear_startDate, currentYear_endDate]} }}) || 0;


        const total_rentals_previousYear = await RentalModel.count({where: {userID: Number(req.params.userid), dateTo: {[Op.between]: [previousYear_startDate, previousYear_endDate]}} });
        const total_reservations_previousYear = await ReservationModel.count({where: {userID: Number(req.params.userid), dateTo: {[Op.between]: [previousYear_startDate, previousYear_endDate]}} });
        const total_refuelings_previousYear = await RefuelingModel.count({where: {userID: Number(req.params.userid), refuelingDate: {[Op.between]: [previousYear_startDate, previousYear_endDate]}} });
        const total_faults_previousYear = await FaultModel.count({where: {userID: Number(req.params.userid), createdAt: {[Op.between]: [previousYear_startDate, previousYear_endDate]}} });
        const total_distance_previousYear = await RentalModel.sum('distance', {where: {userID: Number(req.params.userid), dateTo: {[Op.between]: [previousYear_startDate, previousYear_endDate]}} }) || 0;
        const total_number_of_refueled_liters_previousYear = await RefuelingModel.sum('numberOfLiters', {where: {userID: Number(req.params.userid), refuelingDate: {[Op.between]: [previousYear_startDate, previousYear_endDate]} }}) || 0;
        const total_costBrutto_of_fuel_previousYear = await RefuelingModel.sum('costBrutto', {where: {userID: Number(req.params.userid), refuelingDate: {[Op.between]: [previousYear_startDate, previousYear_endDate]} }}) || 0;


    
        res.status(200).json({status: 'success', data: {
            userid: Number(req.params.userid),
            year: Number(req.params.year),
            data: {
            total_rentals: {currentYear: total_rentals_currentYear, previousYear: total_rentals_previousYear},
            total_reservations: {currentYear: total_reservations_currentYear, previousYear: total_reservations_previousYear},
            total_refuelings: {currentYear: total_refuelings_currentYear, previousYear: total_refuelings_previousYear},
            total_faults: {currentYear: total_faults_currentYear, previousYear: total_faults_previousYear},
            total_distance: {currentYear: total_distance_currentYear, previousYear: total_distance_previousYear},
            total_number_of_refueled_liters: {currentYear: total_number_of_refueled_liters_currentYear, previousYear: total_number_of_refueled_liters_previousYear},
            total_costBrutto_of_fuel: {currentYear: total_costBrutto_of_fuel_currentYear, previousYear: total_costBrutto_of_fuel_previousYear},
            }


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
        const isUserExist = await User.fetchOne(Number(req.params.userid), true);
        if(!isUserExist) {
            res.status(404).json({status: 'fail', data: [{en: 'User with this ID does not exist.', pl: 'Użytkownik o podanym ID nie istnieje.'}]})
            return;
        }

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

















export const fetchTotalTravelledDistanceByUserByCarTypes_GET_user = async (req: Request, res: Response, next: NextFunction) => {
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
        const isUserExist = await User.fetchOne(Number(req.params.userid), true);
        if(!isUserExist) {
            res.status(404).json({status: 'fail', data: [{en: 'User with this ID does not exist.', pl: 'Użytkownik o podanym ID nie istnieje.'}]})
            return;
        }

        const dbResponse = await Rental.getTotalDistanceForUserByMonthInYearAndCarType(Number(req.params.userid), Number(query.year));
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























export const fetchTotalTravelledDistanceForAllPlacesByUser_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

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

        const dbResponse = await Rental.getTotalDistanceForAllPlacesOfUser(Number(req.params.userid));
        res.status(200).json({
            status: 'success',
            data: {
                userid: Number(req.params.userid),
                response: dbResponse,
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









export const fetchFavouriteCarOfUser_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    if(!req.params.userid || isNaN(Number(req.params.userid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
        return;
    }
    if(query.year && isNaN(Number(query.year))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong year.', pl: 'Podano zły rok.'}]})
        return;
    }


    try {
        const isUserExist = await User.fetchOne(Number(req.params.userid), true);
        if(!isUserExist) {
            res.status(404).json({status: 'fail', data: [{en: 'User with this ID does not exist.', pl: 'Użytkownik o podanym ID nie istnieje.'}]})
            return;
        }
        const dbResponse = await Rental.getCarWithGreatestSummarizedDistanceOfUser(Number(req.params.userid), query.year ? Number(query.year) : null);
        res.status(200).json({
            status: 'success',
            data: {
                userid: Number(req.params.userid),
                year: query.year ? Number(query.year) : null,
                response: dbResponse,
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
















export const fetchFavouritePlaceOfUser_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    if(!req.params.userid || isNaN(Number(req.params.userid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
        return;
    }
    if(query.year && isNaN(Number(query.year))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong year.', pl: 'Podano zły rok.'}]})
        return;
    }


    try {
        const isUserExist = await User.fetchOne(Number(req.params.userid), true);
        if(!isUserExist) {
            res.status(404).json({status: 'fail', data: [{en: 'User with this ID does not exist.', pl: 'Użytkownik o podanym ID nie istnieje.'}]})
            return;
        }
        const dbResponse = await Rental.getPlaceWithGreatestSummarizedDistanceOfUser(Number(req.params.userid), query.year ? Number(query.year) : null);
        res.status(200).json({
            status: 'success',
            data: {
                userid: Number(req.params.userid),
                year: query.year ? Number(query.year) : null,
                response: dbResponse,
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


