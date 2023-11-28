
import { NextFunction, Request, Response, response } from 'express'
import Rental from '../models/Rental';
import Car from '../models/Car';
import User from '../models/User';

// id: this.id,
// carID: this.carID,
// userID: this.userID,
// lastEditedByModeratorOfID: this.lastEditedByModeratorOfID,
// carMileageBefore: this.carMileageBefore,
// carMileageAfter: this.carMileageAfter,
// travelDestination: this.travelDestination,
// placeID: this.placeID,
// dateTo: this.dateTo,


export const addOneRentalByNormalUser = async (req: Request, res: Response, next: NextFunction) => {
    //TODO: ONLY LOGGED USER CAN ADD RENTAL!!!
    const data = req.body;
    if (!data.carID || isNaN(Number(data.carID))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong car ID.', pl: 'Podano złe ID samochodu.'}]})
        return;
    }
    else if (!data.userID || isNaN(Number(data.userID))) {
        res.status(400).json({status: 'fail', data: [{en: 'You have passed a wrong user ID.', pl: 'Podano złe ID użytkownika.'}]})
        return;
    }


    try {
        // TODO: CHECK IF CAR EXIST
        //TODO: CHECK IF USER EXIST
        //TODO: CHECK IF CARMILEAGEBEFORE IS THE SAME AS LAST RECORD VALUE - IF NOT, ADD 2 RECORDS - ONE NULL
        //TODO: IF USERID IS DIFFERENT THAN CURRENT USER (MODERATOR) ADD LASTEDITED BY MODERATOR OF ID
        const isCarExist = await Car.fetchOne(Number(data.carID))
        const isUserExist = await User.fetchOne(Number(data.userID))
        if(isCarExist && isUserExist) {
            const lastRentalData = await Rental.fetchLastRentalOfCar(data.carID);
            if (lastRentalData) {
                if(lastRentalData.dataValues.carMileageAfter !== null) {
                    //add carmileagebefore value to lastrentaldata carmileageafter, then add new rental
                    //check if carmileage after is greater than last value
                }
                else {

                }
            }
            else {

            }
            const test = new Rental(null,data.carID,data.userID,null,null,data.carMileageBefore,null,data.travelDestination,null,new Date(Date.now()),null);
            const response = await test.addOneRental()
            res.status(200).json({status: 'success', data: response})
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
    catch (error) {
        res.status(500).json({status: 'error', message: error?.toString()})
    }
}