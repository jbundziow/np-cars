import { NextFunction, Request, Response } from 'express'
import Rental, { RentalModel } from '../models/Rental';
import Reservation, { ReservationModel } from '../models/Reservation';
import Refueling, { RefuelingModel } from '../models/Refueling';
import Fault, { FaultModel } from '../models/Fault';
import User from '../models/User';
import getDateRangesForYear from '../utilities/functions/getDateRangesForYear';
import { Op } from 'sequelize';
import Car from '../models/Car';







export const fetchTotalStatsOfCar_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.carid || isNaN(Number(req.params.carid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
        return;
    }

    try {
        const isCarExist = await Car.fetchOne(Number(req.params.carid), true);
        if(!isCarExist) {
            res.status(404).json({status: 'fail', data: [{en: 'Car of this ID does not exist.', pl: 'Samochód o podanym ID nie istnieje.'}]})
            return;
        }
        const total_rentals = await RentalModel.count({where: {carID: Number(req.params.carid), carMileageAfter: {[Op.ne]: null} }});
        const total_reservations = await ReservationModel.count({where: {carID: Number(req.params.carid)}});
        const total_refuelings = await RefuelingModel.count({where: {carID: Number(req.params.carid)}});
        const total_faults = await FaultModel.count({where: {carID: Number(req.params.carid)}});
        const total_distance = await RentalModel.sum('distance', {where: {carID: Number(req.params.carid) }}) || 0;
        const total_number_of_refueled_liters = await RefuelingModel.sum('numberOfLiters', {where: {carID: Number(req.params.carid) }}) || 0;
        const total_costBrutto_of_fuel = await RefuelingModel.sum('costBrutto', {where: {carID: Number(req.params.carid) }}) || 0;
        let averageConsumption: number | null = await RefuelingModel.sum('averageConsumption', {where: {carID: Number(req.params.carid) }}) || 0;
        if(averageConsumption > 0 && total_refuelings -1 > 0) {
            console.log(averageConsumption);
            console.log(total_refuelings);
        averageConsumption = averageConsumption / (total_refuelings -1);
        }
        else {
            averageConsumption = null;
        }
    
    res.status(200).json({status: 'success', data: {
        carid: Number(req.params.carid),
        total_rentals,
        total_reservations,
        total_refuelings,
        total_faults,
        total_distance,
        total_number_of_refueled_liters: Number(total_number_of_refueled_liters.toFixed(2)),
        total_costBrutto_of_fuel: Number(total_costBrutto_of_fuel.toFixed(2)),
        averageConsumption: averageConsumption ? Number(averageConsumption.toFixed(2)) : null,
    }})
    }
    catch (error) {
        res.status(500).json({status: 'error', data: error})
        return;
    }

}












export const fetchTotalStatsOfCarInYear_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.carid || isNaN(Number(req.params.carid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
        return;
    }
    if(!req.params.year || isNaN(Number(req.params.year))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong year in the URL.', pl: 'Podano zły rok w URL.'}]})
        return;
    }

    try {
        const isCarExist = await Car.fetchOne(Number(req.params.carid), true);
        if(!isCarExist) {
            res.status(404).json({status: 'fail', data: [{en: 'Car of this ID does not exist.', pl: 'Samochód o podanym ID nie istnieje.'}]})
            return;
        }

        const {startDate: currentYear_startDate, endDate: currentYear_endDate} = getDateRangesForYear(Number(req.params.year));
        const {startDate: previousYear_startDate, endDate: previousYear_endDate} = getDateRangesForYear(Number(req.params.year) - 1);



        const total_rentals_currentYear = await RentalModel.count({where: {carID: Number(req.params.carid), dateTo: {[Op.between]: [currentYear_startDate, currentYear_endDate]}} });
        const total_reservations_currentYear = await ReservationModel.count({where: {carID: Number(req.params.carid), dateTo: {[Op.between]: [currentYear_startDate, currentYear_endDate]}} });
        const total_refuelings_currentYear = await RefuelingModel.count({where: {carID: Number(req.params.carid), refuelingDate: {[Op.between]: [currentYear_startDate, currentYear_endDate]}} });
        const total_faults_currentYear = await FaultModel.count({where: {carID: Number(req.params.carid), createdAt: {[Op.between]: [currentYear_startDate, currentYear_endDate]}} });
        const total_distance_currentYear = await RentalModel.sum('distance', {where: {carID: Number(req.params.carid), dateTo: {[Op.between]: [currentYear_startDate, currentYear_endDate]} }}) || 0;
        const total_number_of_refueled_liters_currentYear = await RefuelingModel.sum('numberOfLiters', {where: {carID: Number(req.params.carid), refuelingDate: {[Op.between]: [currentYear_startDate, currentYear_endDate]} }}) || 0;
        const total_costBrutto_of_fuel_currentYear = await RefuelingModel.sum('costBrutto', {where: {carID: Number(req.params.carid), refuelingDate: {[Op.between]: [currentYear_startDate, currentYear_endDate]} }}) || 0;
        let averageConsumption_currentYear: number | null = await RefuelingModel.sum('averageConsumption', {where: {carID: Number(req.params.carid), refuelingDate: {[Op.between]: [currentYear_startDate, currentYear_endDate]} }}) || 0;
        if(averageConsumption_currentYear > 0 && total_refuelings_currentYear -1 > 0) {
        averageConsumption_currentYear = averageConsumption_currentYear / (total_refuelings_currentYear -1);
        }
        else {
            averageConsumption_currentYear = null;
        }


        const total_rentals_previousYear = await RentalModel.count({where: {carID: Number(req.params.carid), dateTo: {[Op.between]: [previousYear_startDate, previousYear_endDate]}} });
        const total_reservations_previousYear = await ReservationModel.count({where: {carID: Number(req.params.carid), dateTo: {[Op.between]: [previousYear_startDate, previousYear_endDate]}} });
        const total_refuelings_previousYear = await RefuelingModel.count({where: {carID: Number(req.params.carid), refuelingDate: {[Op.between]: [previousYear_startDate, previousYear_endDate]}} });
        const total_faults_previousYear = await FaultModel.count({where: {carID: Number(req.params.carid), createdAt: {[Op.between]: [previousYear_startDate, previousYear_endDate]}} });
        const total_distance_previousYear = await RentalModel.sum('distance', {where: {carID: Number(req.params.carid), dateTo: {[Op.between]: [previousYear_startDate, previousYear_endDate]}} }) || 0;
        const total_number_of_refueled_liters_previousYear = await RefuelingModel.sum('numberOfLiters', {where: {carID: Number(req.params.carid), refuelingDate: {[Op.between]: [previousYear_startDate, previousYear_endDate]} }}) || 0;
        const total_costBrutto_of_fuel_previousYear = await RefuelingModel.sum('costBrutto', {where: {carID: Number(req.params.carid), refuelingDate: {[Op.between]: [previousYear_startDate, previousYear_endDate]} }}) || 0;
        let averageConsumption_previousYear: number | null = await RefuelingModel.sum('averageConsumption', {where: {carID: Number(req.params.carid), refuelingDate: {[Op.between]: [previousYear_startDate, previousYear_endDate]} }}) || 0;
        if(averageConsumption_previousYear > 0 && total_refuelings_previousYear -1 > 0) {
        averageConsumption_previousYear = averageConsumption_previousYear / (total_refuelings_previousYear -1);
        }
        else {
            averageConsumption_previousYear = null;
        }


    
        res.status(200).json({status: 'success', data: {
            carid: Number(req.params.carid),
            year: Number(req.params.year),
            data: {
            total_rentals: {currentYear: total_rentals_currentYear, previousYear: total_rentals_previousYear},
            total_reservations: {currentYear: total_reservations_currentYear, previousYear: total_reservations_previousYear},
            total_refuelings: {currentYear: total_refuelings_currentYear, previousYear: total_refuelings_previousYear},
            total_faults: {currentYear: total_faults_currentYear, previousYear: total_faults_previousYear},
            total_distance: {currentYear: total_distance_currentYear, previousYear: total_distance_previousYear},
            total_number_of_refueled_liters: {currentYear: Number(total_number_of_refueled_liters_currentYear.toFixed(2)), previousYear: Number(total_number_of_refueled_liters_previousYear.toFixed(2))},
            total_costBrutto_of_fuel: {currentYear: Number(total_costBrutto_of_fuel_currentYear.toFixed(2)), previousYear: Number(total_costBrutto_of_fuel_previousYear.toFixed(2))},
            averageConsumption: {currentYear: averageConsumption_currentYear ? Number(averageConsumption_currentYear.toFixed(2)) : null, previousYear: averageConsumption_previousYear ? Number(averageConsumption_previousYear.toFixed(2)) : null},
            }


    }})
    }
    catch (error) {
        res.status(500).json({status: 'error', data: error})
        return;
    }

}











export const fetchTotalTravelledDistanceByCar_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    if(!req.params.carid || isNaN(Number(req.params.carid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
        return;
    }
    if(!query.year || isNaN(Number(query.year))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong year.', pl: 'Podano zły rok.'}]})
        return;
    }


    try {
        const isCarExist = await Car.fetchOne(Number(req.params.carid), true);
        if(!isCarExist) {
            res.status(404).json({status: 'fail', data: [{en: 'Car of this ID does not exist.', pl: 'Samochód o podanym ID nie istnieje.'}]})
            return;
        }

        const dbResponse = await Rental.getTotalDistanceForCarByMonthInYear(Number(req.params.carid), Number(query.year));
        res.status(200).json({
            status: 'success',
            data: {
                carid: Number(req.params.carid),
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

















export const fetchFuelUsageForCarForTwoYears_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    if(!req.params.carid || isNaN(Number(req.params.carid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
        return;
    }
    if(!req.params.year || isNaN(Number(req.params.year))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong year.', pl: 'Podano zły rok.'}]})
        return;
    }


    try {
        const isCarExist = await Car.fetchOne(Number(req.params.carid), true);
        if(!isCarExist) {
            res.status(404).json({status: 'fail', data: [{en: 'Car of this ID does not exist.', pl: 'Samochód o podanym ID nie istnieje.'}]})
            return;
        }

        const dbResponse = await Refueling.getAverageFuelUsageForCarByMonthForTwoYears(Number(req.params.carid), Number(req.params.year));
        res.status(200).json({
            status: 'success',
            data: {
                carid: Number(req.params.carid),
                year: Number(req.params.year),
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























export const fetchTotalTravelledDistanceForAllPlacesByCar_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    if(!req.params.carid || isNaN(Number(req.params.carid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
        return;
    }


    try {
        const isCarExist = await Car.fetchOne(Number(req.params.carid), true);
        if(!isCarExist) {
            res.status(404).json({status: 'fail', data: [{en: 'Car of this ID does not exist.', pl: 'Samochód o podanym ID nie istnieje.'}]})
            return;
        }

        const dbResponse = await Rental.getTotalDistanceForAllPlacesOfCar(Number(req.params.carid));
        res.status(200).json({
            status: 'success',
            data: {
                carid: Number(req.params.carid),
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





















export const fetchTotalTravelledDistanceForAllUsersByCar_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    if(!req.params.carid || isNaN(Number(req.params.carid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
        return;
    }


    try {
        const isCarExist = await Car.fetchOne(Number(req.params.carid), true);
        if(!isCarExist) {
            res.status(404).json({status: 'fail', data: [{en: 'Car of this ID does not exist.', pl: 'Samochód o podanym ID nie istnieje.'}]})
            return;
        }

        const dbResponse = await Rental.getTotalDistanceForAllUsersByCar(Number(req.params.carid));
        res.status(200).json({
            status: 'success',
            data: {
                carid: Number(req.params.carid),
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














export const fetchFavouriteUserOfCar_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    if(!req.params.carid || isNaN(Number(req.params.carid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
        return;
    }
    if(query.year && isNaN(Number(query.year))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong year.', pl: 'Podano zły rok.'}]})
        return;
    }


    try {
        const isCarExist = await Car.fetchOne(Number(req.params.carid), true);
        if(!isCarExist) {
            res.status(404).json({status: 'fail', data: [{en: 'Car of this ID does not exist.', pl: 'Samochód o podanym ID nie istnieje.'}]})
            return;
        }
        const dbResponse = await Rental.getUserWithGreatestSummarizedDistanceOfCar(Number(req.params.carid), query.year ? Number(query.year) : null);
        res.status(200).json({
            status: 'success',
            data: {
                carid: Number(req.params.carid),
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
















export const fetchFavouritePlaceOfCar_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    if(!req.params.carid || isNaN(Number(req.params.carid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
        return;
    }
    if(query.year && isNaN(Number(query.year))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong year.', pl: 'Podano zły rok.'}]})
        return;
    }


    try {
        const isCarExist = await Car.fetchOne(Number(req.params.carid), true);
        if(!isCarExist) {
            res.status(404).json({status: 'fail', data: [{en: 'Car of this ID does not exist.', pl: 'Samochód o podanym ID nie istnieje.'}]})
            return;
        }
        const dbResponse = await Rental.getPlaceWithGreatestSummarizedDistanceOfCar(Number(req.params.carid), query.year ? Number(query.year) : null);
        res.status(200).json({
            status: 'success',
            data: {
                carid: Number(req.params.carid),
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


