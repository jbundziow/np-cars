import { NextFunction, Request, Response } from 'express'
import Rental, { RentalModel } from '../models/Rental';
import Reservation, { ReservationModel } from '../models/Reservation';
import Refueling, { RefuelingModel } from '../models/Refueling';
import Fault, { FaultModel } from '../models/Fault';
import User from '../models/User';
import getDateRangesForYear from '../utilities/functions/getDateRangesForYear';
import { Op } from 'sequelize';
import Place from '../models/Place';







export const fetchTotalStatsOfPlace_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.placeid || isNaN(Number(req.params.placeid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong place ID.', pl: 'Podano złe ID projektu.'}]})
        return;
    }

    try {
        const isPlaceExist = await Place.fetchOne(Number(req.params.placeid), true);
        if(!isPlaceExist) {
            res.status(404).json({status: 'fail', data: [{en: 'Place of this ID does not exist.', pl: 'Projekt o podanym ID nie istnieje.'}]})
            return;
        }
        const total_rentals = await RentalModel.count({where: {placeID: Number(req.params.placeid), carMileageAfter: {[Op.ne]: null} }});
        const total_distance = await RentalModel.sum('distance', {where: {placeID: Number(req.params.placeid) }}) || 0;
    
    res.status(200).json({status: 'success', data: {
        placeid: Number(req.params.placeid),
        total_rentals,
        total_distance,
    }})
    }
    catch (error) {
        res.status(500).json({status: 'error', data: error})
        return;
    }

}












export const fetchTotalStatsOfPlaceInYear_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.placeid || isNaN(Number(req.params.placeid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong place ID.', pl: 'Podano złe ID projektu.'}]})
        return;
    }
    if(!req.params.year || isNaN(Number(req.params.year))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong year in the URL.', pl: 'Podano zły rok w URL.'}]})
        return;
    }

    try {
        const isPlaceExist = await Place.fetchOne(Number(req.params.placeid), true);
        if(!isPlaceExist) {
            res.status(404).json({status: 'fail', data: [{en: 'Place of this ID does not exist.', pl: 'Projekt o podanym ID nie istnieje.'}]})
            return;
        }

        const {startDate: currentYear_startDate, endDate: currentYear_endDate} = getDateRangesForYear(Number(req.params.year));
        const {startDate: previousYear_startDate, endDate: previousYear_endDate} = getDateRangesForYear(Number(req.params.year) - 1);


        const total_rentals_currentYear = await RentalModel.count({where: {placeID: Number(req.params.placeid), dateTo: {[Op.between]: [currentYear_startDate, currentYear_endDate]}} });
        const total_distance_currentYear = await RentalModel.sum('distance', {where: {placeID: Number(req.params.placeid), dateTo: {[Op.between]: [currentYear_startDate, currentYear_endDate]} }}) || 0;

        const total_rentals_previousYear = await RentalModel.count({where: {placeID: Number(req.params.placeid), dateTo: {[Op.between]: [previousYear_startDate, previousYear_endDate]}} });
        const total_distance_previousYear = await RentalModel.sum('distance', {where: {placeID: Number(req.params.placeid), dateTo: {[Op.between]: [previousYear_startDate, previousYear_endDate]}} }) || 0;


    
        res.status(200).json({status: 'success', data: {
            placeid: Number(req.params.placeid),
            year: Number(req.params.year),
            data: {
            total_rentals: {currentYear: total_rentals_currentYear, previousYear: total_rentals_previousYear},
            total_distance: {currentYear: total_distance_currentYear, previousYear: total_distance_previousYear},
            }


    }})
    }
    catch (error) {
        res.status(500).json({status: 'error', data: error})
        return;
    }

}











export const fetchTotalTravelledDistanceByPlace_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    if(!req.params.placeid || isNaN(Number(req.params.placeid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong place ID.', pl: 'Podano złe ID projektu.'}]})
        return;
    }
    if(!query.year || isNaN(Number(query.year))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong year.', pl: 'Podano zły rok.'}]})
        return;
    }


    try {
        const isPlaceExist = await Place.fetchOne(Number(req.params.placeid), true);
        if(!isPlaceExist) {
            res.status(404).json({status: 'fail', data: [{en: 'Place of this ID does not exist.', pl: 'Projekt o podanym ID nie istnieje.'}]})
            return;
        }

        const dbResponse = await Rental.getTotalDistanceForPlaceByMonthInYear(Number(req.params.placeid), Number(query.year));
        res.status(200).json({
            status: 'success',
            data: {
                placeid: Number(req.params.placeid),
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

















export const fetchTotalTravelledDistanceByPlaceByCarTypes_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    if(!req.params.placeid || isNaN(Number(req.params.placeid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong place ID.', pl: 'Podano złe ID projektu.'}]})
        return;
    }
    if(!query.year || isNaN(Number(query.year))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong year.', pl: 'Podano zły rok.'}]})
        return;
    }


    try {
        const isPlaceExist = await Place.fetchOne(Number(req.params.placeid), true);
        if(!isPlaceExist) {
            res.status(404).json({status: 'fail', data: [{en: 'Place of this ID does not exist.', pl: 'Projekt o podanym ID nie istnieje.'}]})
            return;
        }

        const dbResponse = await Rental.getTotalDistanceForPlaceByMonthInYearAndCarType(Number(req.params.placeid), Number(query.year));
        res.status(200).json({
            status: 'success',
            data: {
                placeid: Number(req.params.placeid),
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























export const fetchTotalTravelledDistanceForAllUsersByPlace_GET_user = async (req: Request, res: Response, next: NextFunction) => {

    if(!req.params.placeid || isNaN(Number(req.params.placeid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong place ID.', pl: 'Podano złe ID projektu.'}]})
        return;
    }


    try {
        const isPlaceExist = await Place.fetchOne(Number(req.params.placeid), true);
        if(!isPlaceExist) {
            res.status(404).json({status: 'fail', data: [{en: 'Place of this ID does not exist.', pl: 'Projekt o podanym ID nie istnieje.'}]})
            return;
        }

        const dbResponse = await Rental.getTotalDistanceForAllUsersByPlace(Number(req.params.placeid));
        res.status(200).json({
            status: 'success',
            data: {
                placeid: Number(req.params.placeid),
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




















export const fetchTotalTravelledDistanceForAllCarsByPlace_GET_user = async (req: Request, res: Response, next: NextFunction) => {

    if(!req.params.placeid || isNaN(Number(req.params.placeid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong place ID.', pl: 'Podano złe ID projektu.'}]})
        return;
    }


    try {
        const isPlaceExist = await Place.fetchOne(Number(req.params.placeid), true);
        if(!isPlaceExist) {
            res.status(404).json({status: 'fail', data: [{en: 'Place of this ID does not exist.', pl: 'Projekt o podanym ID nie istnieje.'}]})
            return;
        }

        const dbResponse = await Rental.getTotalDistanceForAllCarsByPlace(Number(req.params.placeid));
        res.status(200).json({
            status: 'success',
            data: {
                placeid: Number(req.params.placeid),
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














export const fetchFavouriteCarOfPlace_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    if(!req.params.placeid || isNaN(Number(req.params.placeid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong place ID.', pl: 'Podano złe ID projektu.'}]})
        return;
    }
    if(query.year && isNaN(Number(query.year))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong year.', pl: 'Podano zły rok.'}]})
        return;
    }


    try {
        const isPlaceExist = await Place.fetchOne(Number(req.params.placeid), true);
        if(!isPlaceExist) {
            res.status(404).json({status: 'fail', data: [{en: 'Place of this ID does not exist.', pl: 'Projekt o podanym ID nie istnieje.'}]})
            return;
        }
        const dbResponse = await Rental.getCarWithGreatestSummarizedDistanceOfPlace(Number(req.params.placeid), query.year ? Number(query.year) : null);
        res.status(200).json({
            status: 'success',
            data: {
                placeid: Number(req.params.placeid),
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
















export const fetchFavouriteUserOfPlace_GET_user = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    if(!req.params.placeid || isNaN(Number(req.params.placeid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong place ID.', pl: 'Podano złe ID projektu.'}]})
        return;
    }
    if(query.year && isNaN(Number(query.year))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong year.', pl: 'Podano zły rok.'}]})
        return;
    }


    try {
        const isPlaceExist = await Place.fetchOne(Number(req.params.placeid), true);
        if(!isPlaceExist) {
            res.status(404).json({status: 'fail', data: [{en: 'Place of this ID does not exist.', pl: 'Projekt o podanym ID nie istnieje.'}]})
            return;
        }
        const dbResponse = await Rental.getUserWithGreatestSummarizedDistanceOfPlace(Number(req.params.placeid), query.year ? Number(query.year) : null);
        res.status(200).json({
            status: 'success',
            data: {
                placeid: Number(req.params.placeid),
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


