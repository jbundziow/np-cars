import { NextFunction, Request, Response } from 'express'
import User, { UserModel } from '../models/User';
import getDateRangesForYear from '../utilities/functions/getDateRangesForYear';
import { RentalModel } from '../models/Rental';
import { Op } from 'sequelize';
import { FaultModel } from '../models/Fault';
import { CarModel } from '../models/Car';

















export const fetchHomepageUserData_GET_user = async (req: Request, res: Response, next: NextFunction) => {

    if(!req.params.userid || isNaN(Number(req.params.userid))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
        return;
    }
    if(!req.query.year || isNaN(Number(req.query.year))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong year in the URL.', pl: 'Podano zły rok w URL.'}]})
        return;
    }

    try {
        const isUserExist = await User.fetchOne(Number(req.params.userid), true);
        if(!isUserExist) {
            res.status(404).json({status: 'fail', data: [{en: 'User with this ID does not exist.', pl: 'Użytkownik o podanym ID nie istnieje.'}]})
            return;
        }

        const {startDate: currentYear_startDate, endDate: currentYear_endDate} = getDateRangesForYear(Number(req.query.year));

        const current_user = isUserExist;
        const total_distance_currentYear = await RentalModel.sum('distance', {where: { dateTo: {[Op.between]: [currentYear_startDate, currentYear_endDate]} }}) || 0;
        const total_rentals_currentYear = await RentalModel.count({where: { distance: {[Op.ne]: [null]}, dateTo: {[Op.between]: [currentYear_startDate, currentYear_endDate]}} });
        const faults_to_be_repaired = await FaultModel.count({where: {status: ['accepted', 'pending']} });
        const active_users = await UserModel.count({where: {role: ['admin', 'user']} });
        const all_cars = await CarModel.count({where: {availabilityStatus: {[Op.not]: 'banned'}} });
        const all_available_cars = await CarModel.count({where: {availabilityStatus: ['available']} });



    
        res.status(200).json({status: 'success', data: {
            year: Number(req.query.year),
            current_user,
            total_distance_currentYear,
            total_rentals_currentYear,
            faults_to_be_repaired,
            active_users,
            all_cars,
            all_available_cars
    }})
    }
    catch (error) {
        res.status(500).json({status: 'error', data: error})
        return;
    }

}